import { dirname, join } from "@std/path";
import { existsSync } from "@std/fs";
import generate from "./generate.ts";
import { config } from "../config.ts";
import log from "../lib/log.ts";

/**
 * Adapt themes for all adapters and commit changes if detected.
 * 
 * NOTE: This command requires all adapter repositories to be cloned as siblings
 * in the same parent directory structure. For example:
 * 
 * ~/repos/black-atom-industries/
 * ├── core/
 * ├── nvim/
 * ├── ghostty/
 * ├── zed/
 * └── obsidian/
 * 
 * The command automatically detects this structure based on the location of the core repository.
 */
export default async function() {
    const coreDir = Deno.cwd();
    
    // Determine the parent directory of black-atom-industries
    const parentDir = dirname(dirname(coreDir));
    const orgDir = join(parentDir, "black-atom-industries");

    log.info(`Using organization directory: ${orgDir}`);

    // Check if we're in the correct organization structure
    if (!existsSync(orgDir)) {
        log.error(`Organization directory not found: ${orgDir}`);
        log.error("Please ensure you are running this command from within the black-atom-industries directory structure");
        Deno.exit(1);
    }

    // Iterate through each adapter
    for (const adapter of config.adapters) {
        const adapterDir = join(orgDir, adapter);
        
        // Check if adapter directory exists
        if (!existsSync(adapterDir)) {
            log.warn(`Adapter directory not found: ${adapterDir} - skipping`);
            continue;
        }

        log.info(`Processing adapter: ${adapter}`);
        
        try {
            // Save current directory
            const originalDir = Deno.cwd();
            
            // Change to adapter directory
            Deno.chdir(adapterDir);
            log.info(`Changed to directory: ${adapterDir}`);
            
            // Run generate command
            await generate(config.themeMap);
            
            // Check for changes
            const gitStatus = await runCommand(["git", "status", "--porcelain"]);
            
            if (gitStatus.trim() !== "") {
                log.info(`Changes detected in ${adapter}, committing...`);
                
                // Stage all changes
                await runCommand(["git", "add", "."]);
                
                // Commit changes with a descriptive message
                const commitMessage = `chore: adapt ${adapter} themes with latest core definitions`;
                await runCommand([
                    "git", "commit", "-m", commitMessage,
                    "-m", "Auto-adapted by black-atom-core adapt-all",
                    "-m", `🤖 Adapted with black-atom-core`
                ]);
                
                log.success(`Successfully committed changes to ${adapter}`);
            } else {
                log.info(`No changes detected in ${adapter}`);
            }
            
            // Return to original directory
            Deno.chdir(originalDir);
            
        } catch (error) {
            const errorMessage = error instanceof Error 
                ? error.message 
                : String(error);
            log.error(`Error processing adapter ${adapter}: ${errorMessage}`);
        }
    }
    
    log.success("Completed generating themes for all adapters");
}

/**
 * Run a command and return its output
 */
async function runCommand(command: string[]): Promise<string> {
    try {
        const process = new Deno.Command(command[0], {
            args: command.slice(1),
            stdout: "piped",
            stderr: "piped"
        });
        
        const output = await process.output();
        
        if (!output.success) {
            const errorText = new TextDecoder().decode(output.stderr);
            throw new Error(`Command failed: ${errorText}`);
        }
        
        return new TextDecoder().decode(output.stdout);
    } catch (error) {
        const errorMessage = error instanceof Error 
            ? error.message 
            : String(error);
        throw new Error(`Failed to run command: ${errorMessage}`);
    }
}
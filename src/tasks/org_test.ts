import { assertEquals } from "@std/assert";
import { parseCommand } from "./org.ts";

Deno.test("parseCommand() - simple whitespace split", () => {
    assertEquals(parseCommand("git status"), ["git", "status"]);
    assertEquals(parseCommand("git push"), ["git", "push"]);
    assertEquals(parseCommand("lazygit"), ["lazygit"]);
});

Deno.test("parseCommand() - single quotes", () => {
    assertEquals(
        parseCommand("git commit -m 'fix: thing'"),
        ["git", "commit", "-m", "fix: thing"],
    );
});

Deno.test("parseCommand() - double quotes", () => {
    assertEquals(
        parseCommand('git commit -m "fix: thing"'),
        ["git", "commit", "-m", "fix: thing"],
    );
});

Deno.test("parseCommand() - quotes preserve spaces", () => {
    assertEquals(
        parseCommand('git commit -m "message with multiple spaces"'),
        ["git", "commit", "-m", "message with multiple spaces"],
    );
});

Deno.test("parseCommand() - mixed quoted and unquoted", () => {
    assertEquals(
        parseCommand(`git commit -m 'fix: thing' --amend`),
        ["git", "commit", "-m", "fix: thing", "--amend"],
    );
});

Deno.test("parseCommand() - empty string", () => {
    assertEquals(parseCommand(""), []);
});

Deno.test("parseCommand() - only whitespace", () => {
    assertEquals(parseCommand("   "), []);
    assertEquals(parseCommand(" \t\n "), []);
});

Deno.test("parseCommand() - tabs and newlines as separators", () => {
    assertEquals(parseCommand("git\tstatus"), ["git", "status"]);
    assertEquals(parseCommand("git\nstatus"), ["git", "status"]);
    assertEquals(parseCommand("git\n\tstatus"), ["git", "status"]);
});

Deno.test("parseCommand() - multiple spaces between args", () => {
    assertEquals(parseCommand("git  status"), ["git", "status"]);
    assertEquals(parseCommand("git   commit   -m   'msg'"), [
        "git",
        "commit",
        "-m",
        "msg",
    ]);
});

Deno.test("parseCommand() - quotes are stripped from output", () => {
    const result = parseCommand(`echo "hello world"`);
    assertEquals(result, ["echo", "hello world"]);
});

Deno.test("parseCommand() - single command with no args", () => {
    assertEquals(parseCommand("lazygit"), ["lazygit"]);
});

Deno.test("parseCommand() - chained flags", () => {
    assertEquals(
        parseCommand("git commit --amend --no-edit"),
        ["git", "commit", "--amend", "--no-edit"],
    );
});

---
description: "Intelligently commit theme changes across all Black Atom repositories with semantic messages"
allowed-tools: ["Bash", "Read", "Glob", "LS"]
---

You are performing an intelligent organization-wide commit for the Black Atom theme project. This project has multiple repositories that need to be kept in sync when theme changes are made.

**Theme adapter repositories:** nvim, ghostty, zed, wezterm, tmux
**Non-theme repositories to exclude:** radar.nvim, adapter-template, claude, obsidian, website

**Your task:**

1. **Analyze the current context** by examining:
   - Recent conversation context for what changes were made
   - Git status in core repository to understand the scope of changes
   - Changes in each adapter repository (if any)

2. **Generate themes for all adapters** (without committing):
   ```bash
   deno task adapters:gen
   ```

3. **Examine each adapter repository** to understand what changed:
   ```bash
   cd ~/repos/black-atom-industries && ford --exclude radar.nvim,adapter-template,claude,obsidian,website git status --short
   ```
   - Analyze the nature of changes (new files, modifications, etc.)

4. **Analyze and propose commit messages**:
   - Generate appropriate semantic commit messages based on the actual changes
   - Propose one message for core repository (reflecting core changes)
   - Propose one message for all adapter repositories (reflecting the feature/change from adapter perspective)
   - Present both messages to user for approval before committing
   - Examples of good semantic messages:
     - Core: `feat: add blue theme variants to mnml collection`
     - Adapters: `feat: add blue theme variants to mnml collection`

5. **Wait for user approval** before proceeding with commits

6. **If approved, commit repositories** using ford:
   - Commit core repository with the approved message
   - Use `ford` to commit all theme adapter repositories:
     ```bash
     cd ~/repos/black-atom-industries && ford --exclude radar.nvim,adapter-template,claude,obsidian,website bash -c 'git add -A && git commit -m "message"'
     ```

7. **Push all repositories** using ford:
   ```bash
   cd ~/repos/black-atom-industries && ford --exclude radar.nvim,adapter-template,claude,obsidian,website git push
   ```

**Semantic commit guidelines:**

- `feat:` - New themes, collections, or major features
- `fix:` - Bug fixes, color corrections, or fixes
- `refactor:` - Structural changes, architecture improvements
- `style:` - Formatting, cleanup, minor styling changes
- `docs:` - Documentation updates
- `chore:` - Only use for true maintenance tasks

**Arguments:** $ARGUMENTS (optional context or specific instructions)

**Expected behavior:**

- Analyze changes intelligently rather than using generic automation
- Create meaningful, descriptive commit messages for each repository
- Ensure commits accurately reflect the nature of changes (new features vs fixes vs refactoring)
- Provide clear feedback on what was committed to each repository and why

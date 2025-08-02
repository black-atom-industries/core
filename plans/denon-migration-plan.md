# Denon Migration Plan for Black Atom Core

## Overview

This plan outlines the migration from our custom file watching implementation to Denon, a mature file watcher for Deno that provides more robust features and reliability.

## Why Denon?

### Current Issues
- Module caching problems requiring subprocess spawning
- Complex custom implementation for file watching and debouncing
- Manual handling of file system events and error recovery

### Denon Benefits
- Battle-tested file watching with proper cache handling
- Built-in debouncing and intelligent restart logic
- Configuration-based approach (less code to maintain)
- Drop-in replacement for `deno` command
- Supports multiple script definitions and workflows

## Installation

```bash
# Install denon globally
deno install -qAf --allow-read --allow-run --allow-write --allow-net --allow-env --unstable-sloppy-imports https://deno.land/x/denon@2.5.0/denon.ts
```

## Implementation Plan

### Phase 1: Basic Setup

1. **Create `denon.json` in core directory**:

```json
{
  "$schema": "https://deno.land/x/denon@2.5.0/schema.json",
  "scripts": {
    "generate": {
      "cmd": "deno run --allow-read --allow-write --allow-env src/cli.ts generate",
      "desc": "Generate themes for current adapter"
    },
    "generate:all": {
      "cmd": "deno run --allow-read --allow-write --allow-run --allow-env src/tasks/index.ts dev:adapters:generate",
      "desc": "Generate themes for all adapters",
      "watch": false
    },
    "watch:core": {
      "cmd": "deno run --allow-read --allow-write --allow-run --allow-env src/tasks/index.ts dev:adapters:generate",
      "desc": "Watch core themes and regenerate all adapters",
      "watch": ["src/themes/"],
      "exts": ["ts"],
      "skip": ["**/test/**", "**/.git/**"],
      "interval": 500,
      "legacy": false
    },
    "watch:adapter": {
      "cmd": "deno run --allow-read --allow-write --allow-env src/cli.ts generate",
      "desc": "Watch adapter templates and regenerate",
      "watch": ["themes/"],
      "exts": ["template.*"],
      "interval": 300
    }
  },
  "watcher": {
    "interval": 350,
    "exts": ["ts", "js", "json"],
    "match": ["**/*.*"],
    "skip": ["*/.git/*", "*/node_modules/*"],
    "legacy": false
  },
  "logger": {
    "fullscreen": true,
    "quiet": false,
    "debug": false
  }
}
```

### Phase 2: Simplify Existing Code

1. **Remove complex watch implementation** from `src/tasks/adapters/watch.ts`
2. **Simplify `generate-all.ts`** - no need for subprocess spawning with denon
3. **Update documentation** to use denon commands

### Phase 3: Advanced Configuration

1. **Create environment-specific configs**:

```typescript
// denon.config.ts
import type { DenonConfig } from "https://deno.land/x/denon@2.5.0/mod.ts";

const config: DenonConfig = {
  scripts: {
    // Development scripts
    "dev:watch": {
      cmd: "black-atom-core",
      args: ["generate"],
      desc: "Generate with hot reload",
      watch: true,
      env: {
        "DENO_NO_CACHE": "true"
      }
    },
    
    // Production scripts
    "build:all": {
      cmd: "deno",
      args: ["task", "dev:adapters:generate"],
      desc: "Build all adapters",
      watch: false
    },
    
    // Test scripts
    "test:watch": {
      cmd: "deno",
      args: ["test", "--allow-all"],
      watch: ["src/", "tests/"],
      exts: ["ts", "js"]
    }
  },
  
  // Environment-specific overrides
  env: process.env.NODE_ENV === "production" ? {} : {
    "DENO_LOG": "debug"
  }
};

export default config;
```

### Phase 4: Multi-Adapter Workflow

For watching multiple adapters simultaneously:

```json
{
  "scripts": {
    "watch:multi": {
      "cmd": "deno run --allow-all src/tasks/multi-watch.ts",
      "desc": "Watch core and all adapter templates",
      "watch": [
        "src/themes/",
        "../nvim/themes/",
        "../ghostty/themes/",
        "../zed/themes/",
        "../wezterm/themes/",
        "../tmux/themes/"
      ],
      "exts": ["ts", "template.*"],
      "interval": 500,
      "env": {
        "FORCE_COLOR": "1"
      }
    }
  }
}
```

## Migration Steps

1. **Install denon** globally
2. **Create initial `denon.json`** with basic scripts
3. **Test denon commands** alongside existing implementation
4. **Gradually migrate** task scripts to use denon
5. **Remove custom watch implementation** once denon is proven stable
6. **Update CI/CD** to use denon commands

## Usage Examples

```bash
# Watch core themes and regenerate all adapters
denon run watch:core

# Watch current adapter templates
cd ../nvim && denon run watch:adapter

# Run one-time generation
denon run generate:all

# Development mode with all watchers
denon run watch:multi
```

## Considerations

### Pros
- Mature, well-tested solution
- Cleaner configuration-based approach
- Better error handling and recovery
- Built-in support for environment variables
- Intelligent file watching with debouncing

### Cons
- Additional dependency to install
- Team members need to install denon
- May need adjustment period for new commands

### Potential Issues
- Denon requires specific Deno version (^1.6.0)
- Some features marked as unstable
- Need to ensure denon is installed in CI environment

## Rollback Plan

If denon doesn't work as expected:
1. Keep existing implementation in a branch
2. Document any denon-specific issues encountered
3. Can revert to subprocess approach if needed

## Timeline

- **Week 1**: Set up basic denon configuration and test
- **Week 2**: Migrate watch tasks to denon
- **Week 3**: Simplify codebase and remove old implementation
- **Week 4**: Update documentation and team training

## Success Criteria

- [ ] File changes in core properly trigger regeneration
- [ ] No more module caching issues
- [ ] Simpler codebase with less custom watch logic
- [ ] Team comfortable with denon commands
- [ ] CI/CD pipeline working with denon
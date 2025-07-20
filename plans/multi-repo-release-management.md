# Multi-Repository Release Management Plan

## Current State Analysis

### What We Have

- **5 repositories** (scaling up): core, nvim, ghostty, zed, wezterm + more coming
- **Core-driven architecture**: Core is source of truth, adapters follow
- **Semantic commits**: Already using `feat:`, `fix:`, `refactor:` etc.
- **Custom automation**: Slash commands for org-wide operations
- **Manual coordination**: Currently manual process for releases

### Future Scale Considerations

- **10+ repositories expected**: More editor/terminal adapters planned
- **Potential new adapters**: VSCode, Sublime Text, Emacs, Kitty, Alacritty, iTerm2, Hyper, etc.
- **Platform expansion**: Windows Terminal, macOS Terminal, Linux terminals
- **Tool integrations**: Tmux, Zellij, Starship, Delta, Bat, etc.
- **Exponential complexity**: Manual coordination becomes impossible at scale
- **Community contributions**: More repos = more maintainers = more coordination needs
- **Release frequency**: More adapters = more frequent releases needed

### Current Workflow

1. Make changes in core (themes, features, fixes)
2. Use `/org:commit` to commit across all repos with semantic messages
3. Manual version bumping when needed
4. Manual release creation
5. Manual coordination to keep versions in sync

## Problems Identified

### Pain Points

- **Manual version management**: Prone to inconsistencies (5 repos = manageable, 15 repos = nightmare)
- **Release coordination overhead**: Currently 5 repos, scaling to 10-20+ makes manual impossible
- **No automated changelog**: Missing release notes generation across all adapters
- **Version drift**: Adapters can get out of sync with core (critical with more repos)
- **No release validation**: No automated checks before release (risk increases with scale)
- **Critical scalability issue**: Manual process completely breaks down at 10+ repos

### Scale-Critical Issues

- **O(n²) complexity**: Each new repo adds exponential coordination overhead
- **Human error probability**: Increases dramatically with more manual steps
- **Time investment**: Release overhead becomes unsustainable
- **Contributor friction**: New maintainers can't easily coordinate releases

### Missing Features

- Automated version bumping based on semantic commits
- Coordinated releases across all repositories
- Automated changelog generation
- Release validation and testing
- Rollback capabilities
- Release notifications

## Solution Options

### Option 1: Enhanced Slash Commands (Minimal Change)

**Complexity**: Low | **Automation**: Medium | **Control**: High

Add release management slash commands:

- `/org:version` - Analyze commits and suggest version bump
- `/org:release` - Coordinate releases across all repos
- `/org:changelog` - Generate combined changelog

**Pros**:

- Builds on existing tooling
- Maintains manual control
- Low learning curve

**Cons**:

- Still manual process
- No CI/CD integration
- Limited automation

### Option 2: Semantic-Release with Coordination (Moderate Change)

**Complexity**: Medium | **Automation**: High | **Control**: Medium

Implement [semantic-release](https://github.com/semantic-release/semantic-release) in each repo with custom coordination:

#### What is semantic-release?

Semantic-release is a tool that **fully automates** the version management and package publishing workflow. For Black Atom Industries, this means:

- **Instead of manually coordinating releases across 15+ theme repositories**, semantic-release analyzes your commit messages and automatically creates synchronized releases
- **Instead of manually writing changelogs**, it generates professional release notes from your existing `feat:`, `fix:`, `refactor:` commits
- **Instead of manually bumping versions and creating tags**, it determines the right version bump and creates Git tags automatically
- **Instead of manually creating GitHub releases**, it publishes releases with generated changelogs across all repositories

This is critical for Black Atom because coordinating releases manually across nvim, ghostty, zed, wezterm, and future adapters (VSCode, Sublime, Emacs, etc.) becomes impossible at scale.

#### How it works:

1. **Analyzes commits** since last release using [Conventional Commits](https://www.conventionalcommits.org/)
2. **Determines version bump**:
   - `fix:` commits → patch release (1.0.0 → 1.0.1)
   - `feat:` commits → minor release (1.0.0 → 1.1.0)
   - `feat!:` or `BREAKING CHANGE:` → major release (1.0.0 → 2.0.0)
3. **Generates changelog** from commit messages
4. **Creates Git tag** and **GitHub release**
5. **Publishes** to package managers (npm, etc.)

#### Usage Example for Black Atom:

```bash
# Developer workflow (same as current):
git commit -m "feat: add blue variants to mnml collection"
git commit -m "fix: correct accent colors in mono themes"  
git commit -m "feat!: restructure theme API"
git push origin main
```

**What happens automatically:**

```bash
# 1. CORE repo (black-atom-industries/core):
npx semantic-release
# - Analyzes commits: feat + fix + breaking change
# - Determines: major version bump (breaking change)  
# - Creates: v2.0.0 tag and GitHub release
# - Triggers: GitHub Action to coordinate adapters

# 2. ADAPTER COORDINATION (GitHub Actions):
# Automatically runs in parallel for each adapter:

# nvim repo:
deno task dev:adapters:generate  # Generate new themes
git commit -m "feat: add blue variants to mnml collection"
npx semantic-release --force-version=2.0.0  # Match core version
# Creates: v2.0.0 tag + release for nvim

# ghostty repo:  
deno task dev:adapters:generate  # Generate new themes
git commit -m "feat: add blue variants to mnml collection"
npx semantic-release --force-version=2.0.0  # Match core version
# Creates: v2.0.0 tag + release for ghostty

# zed repo: (same process)
# wezterm repo: (same process)
# All future adapter repos: (same process)
```

**Final Result:**

- All repos have synchronized v2.0.0 releases
- All repos have matching changelogs
- All adapter themes are updated automatically
- Zero manual coordination needed across 15+ repos

#### Implementation Strategy:

- Core repo drives release timing
- Adapter repos follow with matching versions
- Custom [GitHub Actions](https://github.com/features/actions) for cross-repo coordination

**Pros**:

- Fully automated releases (critical for 10+ repos)
- Professional release notes
- Industry standard tool
- Zero human emotion in versioning decisions

**Cons**:

- Learning curve
- Less manual control
- Requires CI/CD setup

### Option 3: Custom Release System (High Change)

**Complexity**: High | **Automation**: High | **Control**: High

Build custom release management system:

- Custom CLI tool for release management
- Database to track releases across repos
- Web dashboard for release monitoring

**Pros**:

- Complete control
- Tailored to our needs
- Maximum flexibility

**Cons**:

- High development overhead
- Maintenance burden
- Reinventing the wheel

## Recommended Approach: Automation-First Strategy

**Given the scaling requirements (10+ repos), we must prioritize automation over manual control.**

### Phase 1: Enhanced Slash Commands (Immediate)

**Timeline**: 1-2 weeks

1. **Create `/org:version`** command:
   - Analyze commits since last release
   - Suggest version bump (patch/minor/major)
   - Show what changed in each repo

2. **Enhance `/org:commit`** with release prep:
   - Add `--release-prep` flag
   - Update version numbers across repos
   - Create release branches

3. **Create `/org:release`** command:
   - Create GitHub releases for all repos
   - Generate combined changelog
   - Tag all repos with same version

### Phase 2: Semantic-Release Integration (Next)

**Timeline**: 2-4 weeks

1. **Setup [semantic-release](https://github.com/semantic-release/semantic-release)** in core repository:
   - Configure for theme-specific needs
   - Custom plugins for adapter coordination
   - [GitHub Actions](https://github.com/features/actions) integration

2. **Adapter coordination system**:
   - Core releases trigger adapter releases
   - Version synchronization
   - Dependency management

3. **Release validation**:
   - Automated testing before release
   - Theme generation verification
   - Cross-platform compatibility checks

### Phase 3: Advanced Features (Future)

**Timeline**: 1-2 months

1. **Release dashboard**:
   - Web interface for release monitoring
   - Release history and analytics
   - Rollback capabilities

2. **Advanced automation**:
   - Automated testing across all platforms
   - Performance regression detection
   - Community notifications

## Implementation Roadmap

### Week 1-2: Foundation

- [ ] Create `/org:version` slash command
- [ ] Enhance `/org:commit` with version management
- [ ] Create `/org:release` slash command
- [ ] Add version tracking to all repos

### Week 3-4: Automation

- [ ] Setup semantic-release in core repo
- [ ] Create GitHub Actions for coordination
- [ ] Implement adapter auto-release triggers
- [ ] Add release validation checks

### Week 5-8: Polish

- [ ] Create combined changelog system
- [ ] Add rollback capabilities
- [ ] Setup release notifications
- [ ] Create release documentation

## Technical Requirements

### Tools Needed

- **[semantic-release](https://github.com/semantic-release/semantic-release)**: For automated releases
- **[conventional-changelog](https://github.com/conventional-changelog/conventional-changelog)**: For changelog generation
- **[GitHub Actions](https://github.com/features/actions)**: For CI/CD coordination
- **[multi-semantic-release](https://github.com/dhoulb/multi-semantic-release)**: For coordinating multiple repos
- **Node.js scripts**: For custom coordination logic

### Repository Changes

- Add [`.releaserc.js`](https://semantic-release.gitbook.io/semantic-release/usage/configuration) to each repo
- Add [GitHub Actions workflows](https://docs.github.com/en/actions/using-workflows)
- Update package.json with version info
- Add release documentation

### Version Strategy

- **Fixed versioning**: All repos use same version
- **Core drives**: Core repo determines version bumps
- **[Semantic versioning](https://semver.org/)**: Follow semver strictly
- **[Conventional Commits](https://www.conventionalcommits.org/)**: Use for automated version bumping
- **Release branches**: Use `release/v1.2.0` for coordination

## Benefits

### Short Term

- Consistent versioning across all repos
- Automated changelog generation
- Reduced manual coordination overhead
- Better release documentation

### Long Term

- Faster release cycles
- Higher quality releases
- Better community communication
- Scalable for additional adapters

## Risks and Mitigations

### Risks

- **Over-automation**: Losing control over releases
- **Complexity**: Making releases harder to understand
- **Breaking changes**: Disrupting current workflow

### Mitigations

- **Gradual rollout**: Implement in phases
- **Manual overrides**: Keep manual control options
- **Thorough testing**: Test on non-critical releases first
- **Documentation**: Clear guides for new workflow

## Success Metrics

### Quantitative

- Release cycle time (target: < 30 minutes)
- Version consistency (target: 100%)
- Manual intervention rate (target: < 10%)
- Release error rate (target: < 5%)

### Qualitative

- Developer satisfaction with release process
- Community feedback on release quality
- Maintainer overhead reduction
- Release documentation quality

## Next Steps

1. **Review and approve** this plan
2. **Create Phase 1 slash commands** (start with `/org:version`)
3. **Test workflow** on development releases
4. **Gather feedback** from release process
5. **Iterate and improve** based on experience

## Questions for Discussion

1. How much automation vs. manual control do we want?
2. Should we use fixed versioning (all repos same version) or independent?
3. What's the acceptable complexity level for the team?
4. How important is rollback capability?
5. Should releases be fully automated or require manual approval?

---

_This plan provides a foundation for streamlined multi-repository release management while maintaining the flexibility to adapt based on team needs and preferences._

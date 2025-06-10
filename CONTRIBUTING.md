# Contributing to Solution Central

First off, thank you for considering contributing to Solution Central! 🎉 Any contributions to the project are greatly appreciated and help make SAP S/4HANA transitions smoother for the entire ecosystem.

Solution Central helps manage the full life-cycle of SAP Technology-focused Software Solutions & Extensions, providing crucial oversight for Clean Core compliance and quality tracking.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Git Guidelines](#git-guidelines)
- [How to Contribute](#how-to-contribute)
- [Branch Naming Convention](#branch-naming-convention)
- [Commit Message Guidelines](#commit-message-guidelines)
- [Pull Request Process](#pull-request-process)
- [Development Guidelines](#development-guidelines)
- [Testing Requirements](#testing-requirements)
- [Communication](#communication)
- [License](#license)

## Code of Conduct

By participating in this project, you agree to:
- Stay constructive in feedback, contribution and collaboration
- Respect all contributors regardless of their experience level
- Focus on what is best for the community and the project
- Show empathy towards other community members

## Getting Started

Before you begin contributing, please:

1. **Check the Issue Tracker**: All issues and feature requests are managed through our [GitHub Issue Tracker](https://github.com/gavdilabs/solutioncentral/issues). Check there first to see if your idea or bug has already been reported.

2. **Join our Discord**: All communication and coordination happens on our [Discord server](https://discord.com/channels/1217814600205205504/1217814718077603861).

3. **Understand the Technology Stack**:
   - **Backend**: SAP Cloud Application Programming (CAP) with Node.js
   - **Frontend**: OpenUI5 and Fiori Elements
   - **Platform**: SAP Business Technology Platform (Cloud Foundry)
   - **Database**: PostgreSQL
   - **Optional**: SAP Business Process Automation Services

4. **Read the Documentation**: Familiarize yourself with the project structure and the two main applications:
   - **Software Solution Cockpit**: Register and manage software solutions
   - **Technology Radar**: Manage technologies and their maturity states

## Git Guidelines

**IMPORTANT**: All contributors MUST follow the [Gavdi Git Guidelines](https://github.com/gavdilabs/GitGuidelines) when contributing to this project. This includes:

- **Small and Simple Changes**: Keep everything bite-sized for better traceability and easier rollbacks
- **Traceability**: All changes must be traceable and link back to decisions (include issue IDs)
- **Documentation**: Keep README and documentation updated
- **Agreed Standards**: Follow the established naming conventions and workflows

Please review the complete guidelines at: https://github.com/gavdilabs/GitGuidelines

## How to Contribute

### Step 1: Find or Create an Issue
- **Find an Issue**: Browse our [Issue Tracker](https://github.com/gavdilabs/solutioncentral/issues) for open issues
- **Create New Issue**: If you have a new idea, create an issue first to discuss it with maintainers

### Step 2: Fork and Clone
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/solutioncentral.git
cd solutioncentral

# Add upstream remote
git remote add upstream https://github.com/gavdilabs/solutioncentral.git
```

### Step 3: Create Your Feature Branch
Follow our strict naming convention (see [Branch Naming Convention](#branch-naming-convention) below).

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create your feature branch
git checkout -b feature-branch_name-MM-YYYY
```

## Branch Naming Convention

Branch names MUST follow this exact format:

### For Features:
```
feature-name_of_feature_with_underscores-MM-YYYY
```
Example: `feature-de_translation-02-2025`

### For Fixes:
```
fix-name_of_fix_with_underscores-MM-YYYY
```
Example: `fix-injection_issue_data_loader-08-2024`

### For Issue-based Fixes:
```
fix-#ISSUE_NUMBER-MM-YYYY
```
Example: `fix-#6403-10-2024`

Where:
- `MM` = Two-digit month
- `YYYY` = Four-digit year
- Use underscores for spaces in the name
- Keep names descriptive but concise

## Commit Message Guidelines

Follow the [Gavdi Git Guidelines](https://github.com/gavdilabs/GitGuidelines) for commit messages:

### Format:
```
Short summary (50 characters max)

Optional detailed description explaining:
- What you changed
- Why you changed it
- Any relevant issue numbers (#123)
```

### Rules:
- **First line**: 50 characters max, capitalized, no period
- **Body**: Wrap at 72 characters, separated by blank line
- **Voice**: Use imperative mood ("Add feature" not "Added feature")
- **Content**: Explain what and why, not how
- **References**: Include issue numbers when relevant

### Examples:
```
Add German translation support

Implements localization framework for German language
as requested in issue #123. Includes all UI strings
and help documentation.

Fixes #123
```

```
Fix data loader injection vulnerability

Prevents SQL injection in the solution import process
by implementing parameterized queries and input validation.

Fixes #456
```

## Pull Request Process

### Before Submitting:
1. **Implement your changes** following our development guidelines
2. **Add/Update Unit Tests** - Your code will not be approved without proper tests
3. **Test thoroughly** - Ensure all tests pass and no regressions
4. **Update documentation** if needed
5. **Commit often** with clear, descriptive messages
6. **Ensure code quality** - Keep code, methods, and comments short and to the point

### Submitting:
1. **Push your branch** to your fork
2. **Create Pull Request** with a clear title describing the feature/fix
3. **Fill out PR template** with detailed description
4. **Link related issues** using "Fixes #123" or "Closes #456"

### PR Title Format:
```
[Feature/Fix]: Brief description of changes
```

Examples:
- `[Feature]: Add German localization support`
- `[Fix]: Resolve data loader injection vulnerability`

### After Submission:
- **Respond to feedback** promptly and constructively
- **Make requested changes** as new commits (don't squash until approved)
- **Keep PR updated** if main branch advances

## Development Guidelines

### Code Quality Standards:
- **Keep it simple**: Code, methods, and comments should be short and to the point
- **Follow existing patterns**: Maintain consistency with existing codebase
- **Comment wisely**: Explain why, not what
- **No magic numbers**: Use named constants
- **Handle errors**: Implement proper error handling

### Required Elements:
- **Unit Tests**: Every new feature must include comprehensive unit tests
- **Integration Tests**: For complex features affecting multiple components
- **Documentation**: Update relevant documentation for API changes
- **Performance**: Consider performance implications of your changes

### Prohibited Actions:
- **No license violations**: Don't include code that violates licenses
- **No foundation changes**: Don't modify core infrastructure without approval
- **No direct commits**: Never commit directly to main branch
- **No incomplete features**: Only submit fully working, tested code

## Testing Requirements

All contributions MUST include appropriate tests:

### Required Test Types:
- **Unit Tests**: Test individual functions/methods
- **Integration Tests**: Test component interactions
- **E2E Tests**: For user-facing features (when applicable)

### Test Standards:
- Tests must pass before PR approval
- Aim for meaningful test coverage, not just high percentages
- Test both happy path and error scenarios
- Mock external dependencies appropriately

### Running Tests:
```bash
# Install dependencies
npm install

# Run unit tests
npm test

# Run specific test suite
npm test -- --grep "feature name"

# Run with coverage
npm run test:coverage
```

## Communication

### Primary Channels:
- **GitHub Issues**: For bugs, feature requests, and project planning
- **Discord**: For real-time discussion and coordination
  - Join us at: https://discord.com/channels/1217814600205205504/1217814718077603861
- **Pull Request Comments**: For code review discussions

### When to Use Each:
- **Issues**: Planning, bug reports, feature proposals
- **Discord**: Quick questions, coordination, community chat
- **PR Comments**: Code-specific discussions, implementation details

## Review Process

All pull requests go through our review process:

1. **Automated Checks**: CI/CD pipeline runs tests and quality checks
2. **Maintainer Review**: Core team reviews code for quality and alignment
3. **Feedback Cycle**: Address any requested changes
4. **Approval**: Receive approval from authorized reviewers
5. **Merge**: Maintainers merge approved PRs

### Review Criteria:
- Code quality and adherence to guidelines
- Test coverage and quality
- Documentation completeness
- Performance considerations
- Security implications

## Recognition

Contributors who follow these guidelines and make valuable contributions will receive:
- Recognition in our contributor list
- Eternal appreciation from the team
- Potential for special recognition badges
- Maybe even a trophy for exceptional contributions! 🏆

## Getting Help

If you need help or have questions:

1. **Check existing issues** and documentation first
2. **Join our Discord** for community support
3. **Create an issue** for bugs or feature discussions
4. **Tag maintainers** in PRs when you need specific feedback

## License

By contributing to Solution Central, you agree that your contributions will be licensed under the same [Apache-2 License](LICENSE) that covers the project.

---

## Quick Reference

### Workflow Summary:
1. Check issues → Fork → Clone → Branch
2. Code → Test → Commit → Push
3. PR → Review → Merge → Celebrate! 🎉

### Remember:
- Follow [Gavdi Git Guidelines](https://github.com/gavdilabs/GitGuidelines)
- Name branches correctly: `feature-name_with_underscores-MM-YYYY`
- Include tests with every contribution
- Keep commits small and descriptive
- Be constructive and collaborative

Thank you for helping make SAP S/4HANA transitions better for everyone! 🚀

---

*For questions about these guidelines, please reach out on [Discord](https://discord.com/channels/1217814600205205504/1217814718077603861) or create an issue.*

# Contributing to GOSPL

Thank you for your interest in contributing to GOSPL! This guide will help you understand how you can contribute to making elderly care better through technology.

## Ways to Contribute

### 1. Code Contributions
- Bug fixes
- Feature implementations
- Performance improvements
- Documentation updates
- Test coverage improvements

### 2. Non-Code Contributions
- Documentation writing
- Translation help
- UI/UX design
- Testing and feedback
- Research collaboration

## Getting Started

### 1. Development Environment Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/gospl.git
   cd gospl
   ```
3. Set up development environment:
   - [Edge Application Setup](../technical/architecture/edge-application.md)
   - [Web Application Setup](../technical/architecture/web-application.md)

### 2. Understanding the Codebase
- Review the [Technical Architecture](../technical/architecture/overview.md)
- Understand our [Design System](../design/brand-guidelines.md)
- Check out the [API Documentation](../technical/api/web-api.md)

## Development Workflow

### 1. Picking an Issue
- Check our [Issue Tracker](https://github.com/gospl/issues)
- Look for "good first issue" labels for beginners
- Comment on issues you'd like to work on
- Create new issues for bugs or features

### 2. Making Changes
1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes following our [Coding Standards](./coding-standards.md)
3. Write tests for your changes
4. Update documentation as needed

### 3. Submitting Changes
1. Commit your changes:
   ```bash
   git commit -m "feat: add your feature description"
   ```
2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Create a Pull Request following our [PR Template](./pull-request-process.md)

## Code Quality Guidelines

### 1. Code Style
- Follow language-specific style guides:
  - Python: PEP 8
  - TypeScript: Standard style
  - CSS: Follow our [Design System](../design/brand-guidelines.md)

### 2. Testing
- Write unit tests for new features
- Ensure existing tests pass
- Add integration tests where appropriate
- Document test cases

### 3. Documentation
- Update relevant documentation
- Add JSDoc/docstring comments
- Include example usage
- Update README if needed

## Component Development

### 1. Edge Application
- Follow sensor data handling best practices
- Implement proper error handling
- Optimize for resource constraints
- Document hardware requirements

### 2. Web Application
- Follow React/Next.js best practices
- Ensure accessibility compliance
- Implement responsive design
- Follow our UI component guidelines

## Review Process

### 1. Code Review
- All changes require review
- Address review comments promptly
- Keep discussions constructive
- Follow up with requested changes

### 2. Testing Requirements
- All tests must pass
- Coverage should not decrease
- Performance impact considered
- Security implications reviewed

## Community Guidelines

### 1. Communication
- Be respectful and inclusive
- Keep discussions on-topic
- Help others when possible
- Follow our [Code of Conduct](../community/code-of-conduct.md)

### 2. Recognition
- Contributors are credited
- Significant contributions noted
- Community achievements celebrated
- Regular contributor highlights

## Getting Help

- Join our [Community Chat](../community/support.md)
- Ask questions on GitHub discussions
- Attend community meetings
- Contact maintainers directly

## Next Steps

1. Set up your [Development Environment](./development-setup.md)
2. Review our [Coding Standards](./coding-standards.md)
3. Check out [Good First Issues](https://github.com/gospl/issues?labels=good-first-issue)
4. Join our [Community](../community/support.md) 
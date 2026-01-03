# Save Context

Save the current conversation context to a file for later use in a new chat session.

## What This Command Does

1. Creates a `.claude/context-saves/` directory if it doesn't exist
2. Generates a context summary from the current conversation
3. Saves it with a timestamp and optional label

## Instructions

When this command is invoked:

1. Create the context-saves directory:
   ```bash
   mkdir -p .claude/context-saves
   ```

2. Generate a context file with the following structure:
   - **Session Date**: Current timestamp
   - **Label**: `$ARGUMENTS` (if provided, otherwise use "session")
   - **Summary**: A comprehensive summary of what was discussed and accomplished
   - **Key Files Modified**: List of files that were created or modified
   - **Current State**: What state the work is in
   - **Next Steps**: What should be done next
   - **Important Decisions**: Any architectural or design decisions made
   - **Code Snippets**: Any important code patterns or implementations to remember

3. Save the file as: `.claude/context-saves/{label}-{YYYYMMDD-HHMMSS}.md`

4. Confirm the save location and provide a summary of what was saved

## Usage

```
/save-context                    # Saves as "session-{timestamp}.md"
/save-context paddle-integration # Saves as "paddle-integration-{timestamp}.md"
/save-context feature-auth       # Saves as "feature-auth-{timestamp}.md"
```

## Output Format

Create a markdown file with this structure:

```markdown
# Context Save: {label}

**Saved**: {timestamp}
**Project**: {project name from package.json or folder name}

## Summary

{2-3 paragraph summary of the conversation and work done}

## Files Modified

- `path/to/file1.ts` - Description of changes
- `path/to/file2.tsx` - Description of changes

## Current State

{Description of where the work currently stands}

## Next Steps

1. {First thing to do next}
2. {Second thing}
3. {Third thing}

## Key Decisions Made

- {Decision 1 and reasoning}
- {Decision 2 and reasoning}

## Important Code/Patterns

{Any code snippets or patterns that should be remembered}

## Notes

{Any additional context that would be helpful}
```

---

**Now, please save the current conversation context.** Use the label provided in the arguments, or "session" if none was given.

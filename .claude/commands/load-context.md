# Load Context

Load a previously saved context from a file to restore knowledge from a previous chat session.

## What This Command Does

1. Lists available saved contexts in `.claude/context-saves/`
2. Finds the matching context file based on the provided pattern
3. Reads and internalizes the saved context
4. Prepares to continue work from where the previous session left off

## Instructions

When this command is invoked:

1. **List available contexts** (if no argument provided or to show options):
   ```bash
   ls -lht .claude/context-saves/ | head -20
   ```

2. **Find matching context**:
   - If `$ARGUMENTS` is provided, find files matching that pattern
   - If multiple matches, show the most recent one
   - If no matches, list available files and ask user to specify

3. **Read the context file** and internalize:
   - Understand what was previously done
   - Note the files that were modified
   - Understand the current state
   - Know what the next steps are
   - Remember key decisions made

4. **Summarize for the user**:
   - Briefly explain what was loaded
   - Remind them of the current state
   - Suggest how to proceed

## Usage

```
/load-context                      # Lists all available contexts
/load-context paddle               # Finds most recent context matching "paddle"
/load-context feature-auth         # Loads the feature-auth context
/load-context 20241225             # Finds contexts from a specific date
```

## After Loading

Once the context is loaded, respond with:

1. **Context Loaded**: Confirm which file was loaded
2. **Previous Session Summary**: Brief recap of what was done
3. **Current State**: Where things stand
4. **Ready to Continue**: Ask what the user wants to do next

Example response format:

```
## Context Loaded ✓

**File**: `.claude/context-saves/paddle-integration-20241225-143052.md`

### Previous Session Summary
{Brief summary of what was accomplished}

### Current State
{Where the work stands}

### Suggested Next Steps
1. {First suggested action}
2. {Second suggested action}

**How would you like to proceed?**
```

---

**Now, please find and load the requested context.** If no argument was provided, list the available saved contexts.

/**
 * STAN makes the subject name available in the `message` event, so it becomes useful to parse the model name back out of the subject.
 */
function parseModelNameFromSubjectName(subject: string) {
    const prefix = 'meditor-'

    return subject.replace(prefix, '').replace(/-/g, ' ').trim()
}

export { parseModelNameFromSubjectName }

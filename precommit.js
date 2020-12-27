'use strict';

const simpleGit = require('simple-git');
const { ESLint } = require('eslint');

const git = simpleGit();

const main = async () => {
    const eslint = new ESLint({ fix: true });

    const gitStatus = await git.status();

    const staged = gitStatus.staged;

    let lintResults = await eslint.lintFiles(staged);

    await ESLint.outputFixes(lintResults);

    lintResults = await eslint.lintFiles(staged);

    const errors = lintResults.reduce((acc, r) => {
        if (r.errorCount) {
            acc.push(...r.messages.map(m => JSON.stringify(m)));
        }

        return acc;
    }, []);

    if (errors.length) {
        throw new Error(errors.join('\n'));
    }

    return git.raw(['add', ...staged]);
};

main()
    .then(() => process.exit(0))
    .catch(e => {
        // eslint-disable-next-line no-console
        console.error(e);

        process.exit(1);
    });

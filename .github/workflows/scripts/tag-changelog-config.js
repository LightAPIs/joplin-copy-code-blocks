module.exports = {
  excludeTypes: ['docs', 'style', 'test', 'chore'],
  renderTypeSection: function (label, commits) {
    let text = `\n### ${label}\n`;

    commits.forEach(commit => {
      text += `- ${commit.subject} (${commit.sha})\n`;
    });

    return text;
  },
};

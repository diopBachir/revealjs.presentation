/* 
  For MathJax 3+ Eqns nums with section numbers
  suggested to use in quarto by Eli Holmes on 
  https://github.com/quarto-dev/quarto-cli/issues/4136 
*/
  MathJax = {
    loader: {load: ['[tex]/tagformat']},
    section: 1,
    tex: {
      tags: 'ams',
      packages: {'[+]': ['tagformat', 'sections']},
      tagformat: {
        number: (n) => MathJax.config.section + '.' + n
      }
    },
    startup: {
      ready() {
        const Configuration = MathJax._.input.tex.Configuration.Configuration;
        const CommandMap = MathJax._.input.tex.SymbolMap.CommandMap;
        new CommandMap('sections', {
          nextSection: 'NextSection'
        }, {
          NextSection(parser, name) {
            MathJax.config.section++;
            parser.tags.counter = parser.tags.allCounter = 0;
          }
        });
        Configuration.create(
          'sections', {handler: {macro: ['sections']}}
        );
        MathJax.startup.defaultReady();
      }
    }
  };
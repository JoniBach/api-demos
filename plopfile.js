module.exports = function (plop) {
    plop.setGenerator('service', {
        description: 'Generate a new service with its own database setup',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Service name (e.g., users, products)?'
            },
            {
                type: 'list',
                name: 'database',
                message: 'Select the database',
                choices: ['SQLite', 'PostgreSQL', 'MySQL', 'MongoDB']
            }
        ],
        actions: function (data) {
            let actions = [
                {
                    type: 'add',
                    path: 'src/{{name}}/{{name}}.module.ts',
                    templateFile: 'plop-templates/module.hbs'
                },
                {
                    type: 'add',
                    path: 'src/{{name}}/{{name}}.service.ts',
                    templateFile: 'plop-templates/service.hbs'
                },
                {
                    type: 'add',
                    path: 'src/{{name}}/{{name}}.controller.ts',
                    templateFile: 'plop-templates/controller.hbs'
                }
            ];

            if (data.database === 'MongoDB') {
                actions.push({
                    type: 'add',
                    path: 'src/{{name}}/{{name}}.schema.ts',
                    templateFile: 'plop-templates/review.schema.hbs'
                });
                actions.push({
                    type: 'add',
                    path: 'src/{{name}}/database.providers.ts',
                    templateFile: 'plop-templates/mongodb-provider.hbs'
                });
            } else {
                actions.push({
                    type: 'add',
                    path: 'src/{{name}}/{{name}}.entity.ts',
                    templateFile: 'plop-templates/entity.hbs'
                });
                switch (data.database) {
                    case 'SQLite':
                        actions.push({
                            type: 'add',
                            path: 'src/{{name}}/database.providers.ts',
                            templateFile: 'plop-templates/sqlite-provider.hbs'
                        });
                        break;
                    case 'PostgreSQL':
                        actions.push({
                            type: 'add',
                            path: 'src/{{name}}/database.providers.ts',
                            templateFile: 'plop-templates/postgres-provider.hbs'
                        });
                        break;
                    case 'MySQL':
                        actions.push({
                            type: 'add',
                            path: 'src/{{name}}/database.providers.ts',
                            templateFile: 'plop-templates/mysql-provider.hbs'
                        });
                        break;
                }
            }

            return actions;
        }
    });
};

# cypresssFramework

commands:

> npx cypress run --b chrome --spec "cypress/e2e/file_path"

flags:

> --browser : browser name to use for testing (chrome, firefox)

> -c        : shortcut flag of "--config baseUrl=http://localhost:

> --e2e     : Run e2e

> -env      : env variables

> --group   : group test cases

> --headed  : show the GUI when running tests in headless mode. 

> --headless: 

> --record  : to record teh test run

> -r        : Mocha reporter

> --spec    : Specify which spec

> -t        : run with tags


> if not exists (
    select * 
    from information_schema.columns
    where table_name = "table_name"
    and column_name = "column_name";
)
begin
    alter table table_name
    add column_name varchar(10);
end;
    
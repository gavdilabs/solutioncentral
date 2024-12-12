# Development Setup & Guidelines

## Local Setup

The following section covers how to setup your local development environment, as well as how to work with the project.

### Required & Recommended Tools

For local development the following requirements need to be fulfilled prior to starting any work.
You must ensure that your editor/environment of choice has the following tools available for use:

1. ESLint
2. Prettier
3. Docsify CLI
4. MBT (Multitarget Build Tool)
5. Podman or Docker CLI (Docker Desktop is not an option)
6. Git
7. Bruno

On top of this, if you're using VSCode, it is also recommended to install the following extensions:

1. SAP CDS Extension
2. VSCode ESLint
3. Rainbow CSV
4. SQLite Viewer

### Setting Up

Once you've installed the required tools, you can then start the initial install of the solution dependencies.
This is done by using the following commands:

```bash
npm run prep
```

This command will run through the entire workspace, and install the dependencies on each application layer.
Once the install is complete, you have two options for running the service layer.

First option is to run the fast iteration version of the service, which allows you to quickly develop and test new features without any database hassles.
This is done using SQLite as the database, in memory. To use this mode, simply run the command

```bash
npm run dev

# OR

npm run debug
```

Now, should you want to mimic the productive environment locally, using a local instance of Postgresql, you'll have to setup a few things before running the service.
In the project we've included a compose file, that includes an image of Postgresql as well as an admin panel that you can use to visually manipulate the database.
For the sake of brevity and ease of use, we'll focus on the visual mode here but know that you can of course do some of these actions from the command line as well, should you wish to do so.

To get your Postgresql instance up and running, you must first run the composition. Be aware that if you already have a composition similar to this one up and running, you can reuse it.

```bash
podman compose up

# OR

docker-compose up
```

Once the images have been downloaded onto your machine, and the initial start up is complete, you can then navigate to the following URL in your browser:

```text
http://localhost:8080
```

This will take you to the Adminer panel, from which you can use the development credentials to log into the Postgresql instance.
If you did not change the configuration, the default login credentials for your local instance is:

```text
Username: postgres
Password: postgres
```

Once you're logged in, you can now go ahead and create the database instance that we want to make use of with our application.
Now, do remember that you cannot name this instance just anything you like, as it must match the name specificed in the service's package.json file.

For this specific project, the database name should be: ```techtransition_mgt```.

With your database instance created, we're now almost there for us to be able to start using Postgresql locally.
However, there is one final step that must be completed first.
Seeing as our database does not yet know of our service's model, we must perform a deployment of the schema to the database.

This is done using the following command:

```bash
cds deploy --profile pg
```

Once the process is complete, your Postgresql instance is now ready for our service to connect.
To make sure that we target Postgresql when running our application we can use one of the following commands:

```bash
cds-ts watch --profile pg

# OR

cds-ts run --profile pg
```

### Debugging

In some cases when debugging, you'll likely get an issue with the port not being connected properly.
When debugging from VSCode, the editor usually injects the 'inspect' flag for your runtime when you boot up the debugging session, however sometimes it does not inject correctly.

For other editors, like Neovim, this flag is not even injected at all and it is on us as the developer to manually set this when we want to start debugging.

To do this, you can use one of the following commands, depending on your needs:

```bash
NODE_OPTIONS='--inspect' cds-ts run # For SQLite

NODE_OPTIONS='--inspect' cds-ts run --profile pg # For Postgresql
```

## Code Style Guidelines

TODO: Write section

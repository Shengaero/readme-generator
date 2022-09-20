let allowedArguments = {
    output: {
        name: 'output',
        short: 'o',
        desc: 'The output location of the README file. By default this will be the current working directory.',
        requiresValue: true
    }
}

function getUserArguments() {
    // start with empty object
    let returnedArgs = {};
    // grab process args
    let argv = process.argv;
    // use this variable to tell what kind of variable we're dealing with
    let next = null;
    // iterate over them
    for(let arg of argv) {
        // start with null argument type
        let argumentType = null;
        // if the next arg is an option value
        if(next !== null) {
            // if the valuable is shorthand we need to get it based off of which allowed argument it matches
            if(next.length === 1) {
                // iterate through them
                for(let key in allowedArguments) {
                    let allowed = allowedArguments[key];
                    // if it matches
                    if(allowed.short === next) {
                        // set and break
                        argumentType = allowed;
                        break;
                    }
                }
            } else {
                // otherwise get the type based on the next variable value
                argumentType = allowedArguments[next];
            }
            // set next to null, we don't need it anymore
            next = null;
        }

        // if the arg starts with either '-' or '--' then it's denoting the next arg will be a value of
        //that option.Given this, we will set the next variable to the first character of the option
        if(arg.startsWith('--')) {
            next = arg.substring(2);
        } else if(arg.startsWith('-')) {
            next = arg.charAt(1);
        }

        // if we have an argument type
        if(argumentType !== null) {
            // arg value defaults to the argument
            let argValue = arg;
            // no value provided
            if(next !== null) {
                if(argumentType.requiresValue) {
                    // they didn't provide a value when we need one, throw an error
                    throw `Error: value not provided for argument ${arg}`;
                }
                // they didn't provide a value, but we do not need one, set arg value to true
                argValue = true;
            }

            // set the value of the argument in the returned arguments
            returnedArgs[argumentType.name] = argValue;
        }
    }

    // return
    return returnedArgs;
}

module.exports = getUserArguments;

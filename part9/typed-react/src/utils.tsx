const unhandleSwitchCase = ( value : never): never => {
    throw new Error(`Undlandled switch case: ${JSON.stringify(value)}`);
}

export { unhandleSwitchCase }


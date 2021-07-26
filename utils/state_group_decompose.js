module.exports = {
    splitStateGroup(states) {
        // replace & to ,
        let commaSeparated = states.replace("&", ",").split(",");

        // trim the start and the end character
        commaSeparated.map(state => {
            let _state = state.trimStart();

            _state = _state.trimEnd();
            return _state;
        });
        return commaSeparated;
    }
};

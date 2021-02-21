import React from "react";

import classnames from "classnames";

export default class Test extends React.Component<{}, {}> {

    render() {

        let examplebox = classnames('examplebox');

        return (
            <div className={examplebox}>
                <h1>Test</h1>
            </div>

        );
    }
}
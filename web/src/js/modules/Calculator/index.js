/**
 * Created by lcz on 2017/12/27.
 */
import React, {Component,PureComponent} from 'react';

class Calculator extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            obj: {
                a: '1',
                b: {
                    c: '2'
                }
            },
            arr: [],
            str: 'hehe'
        };
        this.change = this.change.bind(this);
    }

    change() {
        let obj = this.state.obj;
        obj.a = "A";
        this.setState({
            obj: obj
        });
        console.info(JSON.stringify(this.state));
    }

    render() {
        return (
            <div>
                <h1>{JSON.stringify(this.state)}</h1>
                <a href="javascript:void(0);" onClick={this.change}>change</a>
            </div>
        );
    }
}


export default Calculator;
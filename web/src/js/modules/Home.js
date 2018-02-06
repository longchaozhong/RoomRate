import React, {Component} from 'react' ;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {name: '', btnName: 'BUTTON'};
    }

    handlerTest(arg, e) {
        console.info(arg);
        console.info(e);
    }

    render() {
        return <div>
            <input name="name" type="text" value={this.state.name}
                   onChange={e=>this.setState({name:e.target.value})}/>
            <button onClick={this.handlerTest.bind(this,'AAA')}>{this.state.btnName}</button>
        </div>
    }
}

export default Home
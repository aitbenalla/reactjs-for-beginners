class Welcome extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <h1>Hello {this.props.name}</h1>;
    }
}

class CLock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
        };
        this.timer = null;
    }

    componentDidMount() {
        this.timer = window.setInterval(this.tick.bind(this), 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.timer);
    }

    tick() {
        this.setState({
            date: new Date(),
        });
    }

    render() {
        return (
            <div>
                <p className="fw-bold">
                    its {this.state.date.toLocaleDateString()}{" "}
                    {this.state.date.toLocaleTimeString()}
                </p>
            </div>
        );
    }
}

class Increment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {n: props.start, timer: null};
        this.toggle = this.toggle.bind(this)
        this.reset = this.reset.bind(this)
    }

    componentDidMount() {
        this.play();
    }

    componentWillUnmount() {
        window.clearInterval(this.state.timer);
    }

    play() {
        window.clearInterval(this.state.timer);
        this.setState({
            timer: window.setInterval(this.increment.bind(this), 1000),
        });
    }

    stop() {
        window.clearInterval(this.state.timer);
        this.setState({
            timer: null,
        });
    }

    increment() {
        this.setState((stats, props) => {
            return {n: stats.n + props.step};
        });
    }

    label() {
        return this.state.timer ? "Stop" : "Play";
    }

    toggle() {
        return this.state.timer ? this.stop() : this.play();
    }

    reset() {
        this.stop();
        this.setState((stats, props) => {
            return {n: props.start};
        });
        this.play();
    }

    render() {
        return (
            <div>
                <hr/>
                <p>Value: {this.state.n}</p>
                <div className="btn-group">
                    <button onClick={this.toggle} type="button" class="btn btn-outline-primary">{this.label()}</button>
                    <button onClick={this.reset} type="button" class="btn btn-outline-danger">Reset</button>
                </div>
            </div>
        );
    }
}

class ManualIncrement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            n: 0,
        };
    }

    increment(e) {
        console.log(e);
        this.setState((state, props) => ({
            n: state.n + 1,
        }));
    }

    render() {
        return (
            <div>
                Value : {this.state.n}{" "}
                <button
                    className="ms-3 btn btn-primary"
                    onClick={this.increment.bind(this)}
                >
                    Increment
                </button>
            </div>
        );
    }
}

Increment.defaultProps = {
    start: 0,
    step: 1,
};

function Home() {
    return (
        <div className="py-4 container">
            <Welcome name="Oussama"/>
            <CLock/>
            <ManualIncrement/>
            <Increment start={0}/>
            <Increment start={100} step={10}/>
        </div>
    );
}

ReactDOM.render(<Home/>, document.querySelector("#app"));

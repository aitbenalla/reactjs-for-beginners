function Field({name, type, value, onChange, children}) {
    let field = "";

    switch (type) {
        case "text":
            field = (
                <div className="mb-3">
                    <label className="form-label" htmlFor={name}>
                        {children}:
                    </label>
                    <input
                        type={type}
                        value={value}
                        name={name}
                        id={name}
                        onChange={onChange}
                        className="form-control"
                    />
                </div>
            );
            break;
        case "select":
            field = (
                <div className="mb-3">
                    <label className="form-label" htmlFor={name}>
                        {children}:
                    </label>
                    <select
                        className="form-select"
                        name={name}
                        id={name}
                        value={value}
                        onChange={onChange}
                    >
                        <option value="" disabled>
                            Choose your car
                        </option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="blogger">Blogger</option>
                    </select>
                </div>
            );
            break;
        case "textarea":
            field = (
                <div className="mb-3">
                    <label className="form-label" htmlFor={name}>
                        {children}:
                    </label>
                    <textarea className="form-control" name={name} id={name} cols="30" rows="10" value={value} onChange={onChange} />
                </div>
            );
            break;
        case "checkbox":
            field = (
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={name}
                        name={name}
                        checked={value}
                        onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor={name}>
                        {children}
                    </label>
                </div>
            );
            break;

        default:
            break;
    }

    return field;
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            job: "",
            message: "",
            confirm: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(evt) {
        const name = evt.target.name;
        const type = evt.target.type;
        const value = type === "checkbox" ? evt.target.checked : evt.target.value;
        this.setState({
            [name]: value,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const data = JSON.stringify(this.state);
        console.log(data);
        this.setState({
            name: "",
            job: "",
            message: "",
            confirm: false,
        });
    }

    render() {
        return (
            <div className="container py-4">
                <h1>Form Submit:</h1>
                <form action="post" onSubmit={this.handleSubmit}>
                    <Field
                        name="name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    >
                        Name
                    </Field>
                    <Field
                        name="job"
                        type="select"
                        value={this.state.job}
                        onChange={this.handleChange}
                    >
                        Job
                    </Field>
                    <Field
                        name="message"
                        type="textarea"
                        value={this.state.message}
                        onChange={this.handleChange}
                    >
                        Message
                    </Field>
                    <Field
                        name="confirm"
                        type="checkbox"
                        value={this.state.confirm}
                        onChange={this.handleChange}
                    >
                        Confirm Form
                    </Field>
                    <div className="py-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
                <p>{JSON.stringify(this.state)}</p>
            </div>
        );
    }
}

ReactDOM.render(<Form/>, document.querySelector("#app"));

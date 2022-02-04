let n = 0;

function numberFormat(n) {
    return n.toString().padStart(2, "0");
}

function render() {
    const items = ["Task 1", "Task 2", "Task 3"];
    const list = items.map((item, k) => <li key={k}>{item}</li>);

    const content = (
        <React.Fragment>
            <h1 id="title" className="title">
                Hello <span>{numberFormat(n)}</span>
            </h1>
            <ul>{list}</ul>
        </React.Fragment>
    );

    ReactDOM.render(content, document.querySelector("#app"));
}

render();

window.setInterval(() => {
    n++;
    render();
}, 1000);

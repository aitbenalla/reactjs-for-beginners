let n = 0

function render() {

    const title = React.createElement('h1', {}, 'Hello ',
        React.createElement('span', {}, n)
    )

    ReactDOM.render(title, document.querySelector('#app'))
}

render()

window.setInterval(() => {
    n++
    render()
}, 1000)


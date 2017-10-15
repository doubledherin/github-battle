const React = require('react')

class Popular extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedLanguage: 'All'
        };
        this.updateLanguage = this.updateLanguage.bind(this)
    }

    updateLanguage(language) {
        this.setState(function () {
            return {
                selectedLanguage : language
            }
        })
    }

    render() {
        const languages = [
            'All',
            'Javascript',
            'Ruby',
            'Java',
            'CSS',
            'Python'
        ]
        console.log(this.state.selectedLanguage)
        return (
            <ul className="languages">
                {languages.map(language => {
                    return (
                        <li
                            style={ language === this.state.selectedLanguage ? { color: "red" } : { color: "black" }}
                            key={language}
                            onClick={this.updateLanguage.bind(null, language)}>
                                {language}
                        </li>
                    )
                }, this)}
            </ul>
        )
    }
}

module.exports = Popular

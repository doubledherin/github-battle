const React = require('react')
const PropTypes = require('prop-types')
const api = require('./utils/api')

function RepoGrid (props) {
    return (
        <ul className="popular-list">
            {props.repos.map((repo, index) => {
                return (
                    <li key={repo.name} className="popular-item">
                        <div className="popular-rank">#{index+1}</div>
                        <ul className="space-list-items">
                            <li>
                                <img
                                    className="avatar"
                                    src={repo.owner.avatar_url}
                                    alt={"Avatar for " + repo.owner.login} />
                            </li>
                            <li><a href={repo.html_url}>{repo.name}</a></li>
                            <li>@{repo.owner.login}</li>
                            <li>{repo.stargazers_count} stars</li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

function SelectedLanguage (props) {
    const languages = [
        'All',
        'Javascript',
        'Ruby',
        'Java',
        'CSS',
        'Python'
    ]
    return (
        <ul className="languages">
            {languages.map(language => {
                return (
                    <li
                        style={ language === props.selectedLanguage ? { color: "#d0021b" } : { color: "black" }}
                        key={language}
                        onClick={props.onSelect.bind(null, language)}>
                            {language}
                    </li>
                )
            }, this)}
        </ul>
    )
}

SelectedLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
}

class Popular extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            selectedLanguage: 'All',
            repos: null
        };
        this.updateLanguage = this.updateLanguage.bind(this)
    }
    componentDidMount() {
        this.updateLanguage(this.state.selectedLanguage)
    }
    updateLanguage(language) {
        this.setState(function () {
            return {
                selectedLanguage : language,
                repos: null
            }
        })
        api.fetchPopularRepos(language)
            .then(repos => {
                this.setState(function() {
                    return {
                        repos: repos
                    }
                })
        })
    }

    render() {
        return (
            <div>
                <SelectedLanguage onSelect={this.updateLanguage} selectedLanguage={this.state.selectedLanguage}/>
                {!this.state.repos ? (
                        <p>LOADING</p>
                    ) : <RepoGrid repos={this.state.repos}/>
                }
            </div>
        )
    }
}

module.exports = Popular

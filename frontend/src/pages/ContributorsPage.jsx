import React, { useEffect, useState } from 'react'
import '../styles/ContributorsPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import CountUp from 'react-countup'
import axios from 'axios'

const ContributorsPage = () => {
    const [contributors, setContributors] = useState([])
    const [repoStats, setRepoStats] = useState({})
    const [loading, setLoading] = useState(true)
    const fetchData = async () => {
        try {
            const contributorsData = [];
            const repoUrl = 'https://api.github.com/repos/manikumarreddyu/AgroTech-AI';
            let page = 1;
            let isFetching = true;
    
            // Fetch repository stats
            const repoResponse = await fetch(repoUrl);
            const repoData = await repoResponse.json();
            setRepoStats(repoData);
    
            // Fetch all contributors with pagination
            while (isFetching) {
                const contributorsResponse = await fetch(`${repoUrl}/contributors?per_page=100&page=${page}`);
                const pageData = await contributorsResponse.json();
    
                if (!contributorsResponse.ok || pageData.length === 0) {
                    isFetching = false;
                } else {
                    contributorsData.push(...pageData);
                    page++;
                }
            }
    
            setContributors(contributorsData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setContributors([]);
            setRepoStats({});
        } finally {
            setLoading(false);
        }
    };
    

    useEffect(() => {
        fetchData()
    }, [])

    const renderStats = () => {
        const contributorsCount = contributors.length
        const stats = [
            { label: 'Contributors', value: contributorsCount, icon: 'users' },
            {
                label: 'Total Contributions',
                value:
                    contributors.reduce(
                        (sum, contributor) => sum + contributor.contributions,
                        0
                    ) || 0,
                icon: 'git-commit',
            },
            {
                label: 'GitHub Stars',
                value: repoStats.stargazers_count || 0,
                icon: 'star',
            },
            {
                label: 'Forks',
                value: repoStats.forks_count || 0,
                icon: 'git-branch',
            },
        ]

        return (
            <div className="contributor-stats-grid" id="statsGrid">
                {stats.map((stat) => (
                    <div className="contributor-stat-card" key={stat.label}>
                        <div
                            className="contributor-icon"
                            dangerouslySetInnerHTML={{
                                __html: getIcon(stat.icon),
                            }}
                        />
                        <h3>
                            <CountUp
                                start={0}
                                end={stat.value}
                                duration={3}
                                separator=","
                            />
                        </h3>
                        <p>{stat.label}</p>
                    </div>
                ))}
            </div>
        )
    }

    const renderContributors = () => {
        return (
            <div
                className="contributor-contributors-grid"
                id="contributorsGrid"
            >
                {contributors.map((contributor) => (
                    <div
                        className="contributor-contributor-card"
                        key={contributor.login}
                    >
                        <img
                            src={contributor.avatar_url}
                            alt={contributor.login}
                        />
                        <h3>{contributor.login}</h3>
                        <p>{contributor.type}</p>
                        <div className="contributor-contributions">
                            {contributor.contributions} Contributions
                        </div>
                        <div className="contributor-footer">
                            <a
                                href={contributor.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {getIcon('external-link')}
                                <FontAwesomeIcon icon={faGithub} />
                            </a>
                            {getIcon('github')}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const getIcon = (name) => {
        const icons = {
            //    svg icons
        }
        return icons[name] || ''
    }

    return (
        <>
            <section className=" dark:bg-slate-900">
                <div className="contributor-contributors">
                    {loading ? (
                        <div id="loading" className="contributor-loading"></div>
                    ) : (
                        <>
                            <h2 className="text-green-500">
                                Project Statistics
                            </h2>
                            {renderStats()}
                            <h2 className="text-green-700">
                                Meet Our Contributors
                            </h2>
                            {renderContributors()}
                        </>
                    )}
                </div>
            </section>
        </>
    )
}

export default ContributorsPage
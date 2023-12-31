function githubVersion() {

        const owner = 'MaXianbibi'; 
        const repo = 'ft_transcendence'; 
        const branch = 'main'; 


        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const total = data.stats.total;
                const commitMessage = data.commit.message;
                const commitAuthor = data.commit.author.name;
                const commitDate = data.commit.author.date;

                let value = "";
                if (total < 1) {
                    value = "sert a rien";
                }
                else if (total > 1 && total < 10) {
                    value = "merdique";
                }
                else if (total > 10 && total < 50) {
                    value = "pas mal";
                }
                else if (total > 50 && total < 100) {
                    value = "bien";
                }
                else if (total > 100 && total < 500) {
                    value = "excellent";
                }
                else if (total > 500) {
                    value = "GOAT";
                }

                const commitDetails = `last commit on : (${branch}):<br>
                                        The dude: ${commitAuthor}<br>
                                        Message: ${commitMessage}<br>
                                        Date: ${commitDate}<br>
                                        Qualite du commit : ${value}`;

                // Afficher les détails du dernier commit dans la div avec l'id "commitDetails"
                document.getElementById('githubInfo').innerHTML = commitDetails;
            })
            .catch(error => {
                document.getElementById('githubInfo').innerHTML = "Erreur lors de la récupération des informations sur le dernier commit.";

        });
}

export { githubVersion };
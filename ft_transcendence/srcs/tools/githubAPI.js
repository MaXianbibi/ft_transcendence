function githubVersion() {

        const owner = 'MaXianbibi'; // Remplacez par le nom du propriétaire du référentiel
        const repo = 'ft_transcendence'; // Remplacez par le nom du référentiel
        const branch = 'main'; // Branche principale


        const apiUrl = `https://api.github.com/repos/${owner}/${repo}/commits/${branch}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const commitMessage = data.commit.message;
                const commitAuthor = data.commit.author.name;
                const commitDate = data.commit.author.date;

                const commitDetails = `last commit on : (${branch}):<br>
                                        The dude: ${commitAuthor}<br>
                                        Message: ${commitMessage}<br>
                                        Date: ${commitDate}`;

                // Afficher les détails du dernier commit dans la div avec l'id "commitDetails"
                document.getElementById('githubInfo').innerHTML = commitDetails;
            })
            .catch(error => {
                document.getElementById('githubInfo').innerHTML = "Erreur lors de la récupération des informations sur le dernier commit.";

        });
}

export { githubVersion };
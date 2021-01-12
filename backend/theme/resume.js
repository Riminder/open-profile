const dynamicResume = (options, themeOptions, path)=>{
    return `
    <!doctype html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
        integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

    <title>Resume maker</title>
    <style>
        .resume {
            width: 6.1in;
            height: 7.86in;
            font-size: 0.7rem;
            line-height: 1rem;
            background-color: white!important;
            padding: 1rem;
        }

        .box {
            background-color: white;
            width: 100%;
            height: 100%;
        }

        .header {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
        }
        .header-left {
            -webkit-box-flex: 1;
            -ms-flex: 1 1 50%;
            flex: 1 1 50%;
            width: 50%;
        }
        .header-right {
            -webkit-box-flex: 1;
            -ms-flex: 1 1 50%;
            flex: 1 1 50%;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: flex-end;
        }
        
        .photo img {
            width: 5rem;
            height: 5rem;
            border: 1px solid #34CBE6;
        }
        
        .title {
            margin: 1rem auto;
            color: gray;
            
        }

        .divider {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            margin-bottom: 0.5rem;
        }

        .divider-border {
            border: 3px solid #34CBE6;
            width: 100px;
            height: 0;
            margin-right: 1rem;
        }

        .divider-title {
            color: #34CBE6;
        }
        .list {
            padding: 0!important;
            margin: 0important;
            list-style: none;
        }
        .list-item {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
             justify-content: flex-start;
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
            margin-bottom: 0.5rem;
        }

        .list-item-left {
            width: 100px;
            max-width: 100px;
            height: 0;
            margin-right: 1rem;
        }

        .skills {
            list-style: none;
            display: flex;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
             justify-content: flex-start;
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
        }

        .skills li {
            margin-right: 5px;
            font-weight: 600;
        }

        .bold {
            font-weight: bold;
        }

        .primary {
            color: #34CBE6;
            max-width: 9rem;
        }

        .secondary {
            color: #00495D;
        }

        .mr0 {
            margin: 0;
        }

        .mrr1 {
            margin-right: 0.5rem;
        }

        .italic {
            font-style: italic;
        }
        
        .xlarge {
            font-size: 1.3rem;
            line-height: 1.7rem;
        }

        .large {
            font-size: 1rem;
            line-height: 1.1rem;
        }
        
        .medium {
            font-size: 0.8rem;
            line-height: 1rem;
        }

        .center {
            text-align: center;
        }

        ul {
            margin: 0;
            padding: 0;
        }

        .break-line {
            max-width: 25rem;
        }
        

    </style>

</head>

<body>
<div class="resume border shadow d-flex aligh-items-center jusify-content-center">
    <div class="box" id="resume">
    <div class="header d-flex jusify-content-center">
        <div class="header-left">
            <div class="xlarge bold">${options.name}</div>
            <div class="secondary">
                <div>
                    Né le ${options.birthDate}
                </div>
                <div>${options.phone }</div>
                <div>${options.email}</div>
                <div>
                    ${options.family_situation}
                </div>
            </div>
        </div> 
        <div class="header-right">
            <div class="primary mrr1">
                <div>${options.address}</div>
            </div>
            <div class="photo">
                <img src="file:///home/riminder/Riminder/open-profile/backend/${path}" />
            </div>
        </div>
    </div>
    <div class="title center large bold">
        ${options.title ? options.title : 'Master en Energétique et Rhénologie'}
    </div>
    <div class="divider">
        <div class="divider-border"></div>
        <div class="divider-title bold medium">Expériences Professionnelles</div>
    </div>
    <ul class="list">
        ${JSON.parse(options.experiences).map(exp => {
            return (
                `<li class="list-item">
                    <div class="list-item-left">${exp.dateStart} - ${exp.dateEnd}</div>
                    <div class="break-line">
                        <div>
                            <span class="bold">${exp.jobTitle}</span>, <span class="italic">${exp.company}</span>
                        </div>
                        <div>
                            ${exp.description}
                        </div>
                    </div>
                </li>`
            )
        }).join('')}
    </ul>
    <div class="divider">
        <div class="divider-border"></div>
        <div class="divider-title bold medium">Formation</div>
    </div>
    <ul class="list">
        ${JSON.parse(options.educations).map(edu => {
            return (
                `<li class="list-item">
                    <div class="list-item-left">${edu.dateStart} - ${edu.dateEnd}</div>
                    <div class="break-line">
                        <div>
                            <span class="bold">${edu.title}</span>, <span class="italic">${edu.school}</span>
                        </div>
                        <div>
                            ${edu.description}
                        </div>
                    </div>
                </li>`
            )
        }).join('')}
    </ul>
    <div class="divider">
        <div class="divider-border"></div>
        <div class="divider-title bold medium">Compétences</div>
    </div>
    <ul class="skills">
        ${ JSON.parse(options.skills).map(skill => {
            return (
                `<li>${skill}${', '}</li>`
            )
        }).join('')}
    </ul>
    <div class="divider">
        <div class="divider-border"></div>
        <div class="divider-title bold medium">Languages</div>
    </div>
    <ul class="skills">
        ${ options.languages.split(",").map(lang => {
            return (
                `<li>${lang}</li>`
            )
        }).join('')}
    </ul>
    </div>
</div>
    <!-- Optional JavaScript; choose one of the two! -->

    <!-- Option 1: jQuery and Bootstrap Bundle (includes Popper) -->
    <!-- <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script> -->

    <!-- Option 2: jQuery, Popper.js, and Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"
        integrity="sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN"
        crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js"
        integrity="sha384-w1Q4orYjBQndcko6MimVbzY0tgp4pWB4lZ7lr30WKz0vr/aWKhXdBNmNb5D92v7s"
        crossorigin="anonymous"></script>

</body>

</html>
    `;
}



module.exports = dynamicResume ;
import React, { useState } from "react"
import CreatableSelect from 'react-select/creatable'
import moment from 'moment'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux"
import { postProfile } from "../store/actions"
import "../styles/main.scss"
import Layout from "../components/layout"
import photo from "../assets/photo.png"


const components = {
  DropdownIndicator: null,
};

const createOption = label => ({
  label,
  value: label,
});


const Home = props => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [birthDate, setBirthDate] = useState(new Date())
  const [familySituation, setFamilySituation] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [title, setTitle] = useState("")
  const [photoPath, setPhotoPath] = useState(photo)
  const [file, setFile] = useState("")
  const [experiences, setExperiences] = useState([{
    dateStart: '',
    dateEnd: '',
    jobTitle: '',
    company: '',
    description: ''
  }])
  const [educations, setEducations] = useState([{
    dateStart: '',
    dateEnd: '',
    title: '',
    school: '',
    description: ''
  }])
  const [skills, setSkills] = useState([])
  const [inputSkill, setInputSkill] = useState('')
  const [languages, setLanguages] = useState([])
  const [inputLanguage, setInputLanguage] = useState('')

  const handleSkillsChange = (value, actionMeta) => {
    setSkills(value)
  }
  const handleInputSkillChange = inputValue => {
    setInputSkill(inputValue)
  };
  const handleSkillKeyDown = event => {
    if (!inputSkill) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if(skills instanceof Array) {
          setSkills([...skills, createOption(inputSkill)])
        } else {
          setSkills([createOption(inputSkill)])
        }
        setInputSkill('')
        event.preventDefault();
    }
  };

  const handleLanguagesChange = (value, actionMeta) => {
    setLanguages(value)
  }
  const handleInputLanguageChange = inputValue => {
    setInputLanguage(inputValue)
  };
  const handleLanguagesKeyDown = event => {
    if (!inputLanguage) return;
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        if(languages instanceof Array) {
          setLanguages([...languages, createOption(inputLanguage)])
        } else {
          setLanguages([createOption(inputLanguage)])
        }
        setInputLanguage('')
        event.preventDefault();
    }
  };

  const changeExperience = (event, index) => {
    const name = event.target.name
    const value = event.target.value
    const newExperiences = [...experiences]
    newExperiences[index][`${name}`] = value
    setExperiences(newExperiences)
  }

  const addExperience = () => {
    const newExperiences = [...experiences]
    newExperiences.push({
      dateStart: '',
      dateEnd: '',
      jobTitle: '',
      company: '',
      description: ''
    })
    setExperiences(newExperiences)
  }

  const deleteExperience = (index ) => {
    const newExperiences = [...experiences].splice(index, 1)
    setExperiences(newExperiences)
  }
  const deleteEducation = (index ) => {
    const newEducations = [...educations].splice(index, 1)
    setEducations(newEducations)
  }

  const changeEducation = (event, index) => {
    const name = event.target.name
    const value = event.target.value
    const newEducations = [...educations]
    newEducations[index][`${name}`] = value
    setEducations(newEducations)
  }

  const addEducation = () => {
    const newEducations = [...educations]
    newEducations.push({
      dateStart: '',
      dateEnd: '',
      title: '',
      school: '',
      description: ''
    })
    setEducations(newEducations)
  }

  const DownloadFile = () => {
    props.postProfile({
      firstName,
      lastName,
      email,
      birthDate: moment(birthDate).format('DD/MM/YYYY'),
      familySituation,
      phone,
      address,
      title,
      experiences,
      educations,
      skills: skills.map(s => s.label),
      languages: languages.map(l => l.label),
    }, file)
  }

  const uploadPhoto = (event) => {
    let file = event.target.files[0];
    if (file) {
      const reader = new FileReader(file);
      reader.readAsDataURL(file);
      reader.onload = () => {
        // set image and base64'd image data in component state
        setPhotoPath(reader.result);
        setFile(file)
      }
    }
  }

  return (
    <Layout>
      <div className="row pt-md-0" style={{maxWidth: '100vw', backgroundColor: 'rgba(0, 0, 0, 0.03)'}}>
        <div className="col-12 col-lg-6 builder">
          <div className="row">
            <div className="col-lg-12 wrapper">
              <div className="card card-body bg-white border-light mb-6">
                <h3 className="center intro"><a href="https://hrflow.ai" target="_blank">HrFlow.ai</a> Resume builder</h3>
                <div className="card-header border-light p-3 mb-4 mb-md-0 highlighted">
                  <h3 className="h5 mb-0">information personnelle</h3>
                </div>
                <div className="card-body p-0 p-md-4">
                  <div className="row justify-content-center">
                    <div className="col-12 col-lg-6">
                      <div className="mb-4">
                        <label htmlFor="cartInputEmail1">Prénom *</label>
                        <input
                          type="text"
                          onChange={(event) => setFirstName(event.target.value)}
                          value={firstName}
                          placeholder="John"
                          className="form-control"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="mb-4">
                        <label htmlFor="cartInputAddress1">Nom *</label>
                        <input
                          type="text"
                          placeholder="Doe"
                          className="form-control"
                          onChange={(event) => setLastName(event.target.value)}
                          value={lastName}
                        />
                      </div>
                    </div>
                    <div className="mb-4 col-12">
                      <div className="row align-items-center">
                        <div className="col-lg-1 mb-2 mb-lg-0">
                          <div className="avatar-lg">
                            <img src={photoPath} alt="Profile Image" className="rounded-circle" style={{height: '48px'}} />
                          </div>
                        </div>
                        <div className="col-lg-5 mb-3 mb-lg-0">
                          <div className="h6 mb-0 ml-lg-3">Photo</div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-file mb-3">
                            <input type="file" accept="image/jpeg, image/png" id="customFile" onChange={(event) => uploadPhoto(event)} className="form-file-input" />
                            <label htmlFor="customFile" className="form-file-label">
                              <span className="form-file-text">Choisir un fichier...</span>
                              <span className="form-file-button">Browse</span>
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="mb-4">
                        <label htmlFor="cartInputEmail1">Email *</label>
                        <input
                          type="email"
                          placeholder="John@doe.com"
                          className="form-control"
                          onChange={(event) => setEmail(event.target.value)}
                          value={email}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="mb-4">
                        <label htmlFor="cartInputEmail1">Numéro de telephone *</label>
                        <input
                          type="phone"
                          placeholder="0044 333 333"
                          className="form-control"
                          onChange={(event) => setPhone(event.target.value)}
                          value={phone}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="mb-4">
                        <label htmlFor="cartInputAddress1">Date de naissance *</label>
                        {/* <DatePicker
                          onChange={setBirthDate}
                          value={birthDate}
                          className="form-control"
                        /> */}
                        <DatePicker selected={birthDate} onChange={date => setBirthDate(date)} />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="mb-4">
                        <label htmlFor="cartInputAddress1">situation familiale *</label>
                        <input
                          type="text"
                          placeholder="Célibataire"
                          className="form-control"
                          onChange={(event) => setFamilySituation(event.target.value)}
                          value={familySituation}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-12">
                      <div className="mb-4">
                        <label>Adresse</label>
                        <input
                          type="text"
                          placeholder="eg. 2627 Hanover St, Palo Alto, CA 94304, États-Unis" 
                          className="form-control" 
                          onChange={(event) => setAddress(event.target.value)}
                          value={address}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-12">
                      <div className="mb-4">
                        <label>Poste actuel</label>
                        <input
                          type="text"
                          placeholder="eg. ingénieur études et développement"
                          className="form-control"
                          onChange={(event) => setTitle(event.target.value)}
                          value={title}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-header border-light p-3 mb-4 mb-md-0 highlighted">
                  <h3 className="h5 mb-0">Expériences Professionnelles</h3>
                </div>
                <div className="card-body p-0 p-md-4">
                  {experiences.map((experience, index) => {
                    return (
                      <div key={`exp-${index}`} className="row justify-content-center item-wrapper">
                        {experiences.length > 1 && (
                          <button
                            className="btn btn-outline-primary delete"
                            onClick={() => deleteExperience(index)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        )}
                        <div className="col-12 col-lg-6">
                          <div className="mb-4">
                            <label htmlFor="cartInputAddress1">Date de début *</label>
                            <input value={experience.dateStart} onChange={event => changeExperience(event, index)} name="dateStart" type="text" placeholder="10/20/2018" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-4">
                            <label htmlFor="cartInputAddress1">Date de fin *</label>
                            <input value={experience.dateEnd} onChange={event => changeExperience(event, index)} name="dateEnd" type="text" placeholder="aujourd'hui" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-4">
                            <label htmlFor="cartInputAddress1">Intitulé du poste *</label>
                            <input value={experience.jobTitle} onChange={event => changeExperience(event, index)} name="jobTitle" type="text" placeholder="Ingénieur R&D" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-4">
                            <label htmlFor="cartInputAddress1">Entreprise *</label>
                            <input value={experience.company} onChange={event => changeExperience(event, index)} name="company" type="text" placeholder="Google" className="form-control" />
                          </div>
                        </div>
                        <div className="col-12 col-lg-12">
                          <div className="mb-4">
                            <label>Description du poste</label>
                            <textarea value={experience.description} onChange={event => changeExperience(event, index)} name="description" type="text" placeholder="eg. ..." className="form-control" />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="col-12 mb-4">
                    <button
                      className="btn btn-outline-primary"
                      style={{width: '100%'}}
                      onClick={() => addExperience()}
                    >
                      <span className="mr-1">
                      <FontAwesomeIcon className="icon-left" icon={faPlus} />
                      </span> Ajouter une experience
                    </button>
                  </div>
                </div>
                <div className="card-header border-light p-3 mb-4 mb-md-0 highlighted">
                  <h3 className="h5 mb-0">Formation</h3>
                </div>
                <div className="card-body p-0 p-md-4">
                  {educations.map((education, index) => {
                    return(
                      <div key={`edu-${index}`} className="row justify-content-center item-wrapper">
                        {educations.length > 1 && (
                          <button
                            className="btn btn-outline-primary delete"
                            onClick={() => deleteEducation(index)}
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        )}
                        <div className="col-12 col-lg-6">
                          <div className="mb-4">
                            <label htmlFor="cartInputAddress1">Date de début *</label>
                            <input
                              type="text"
                              value={education.dateStart}
                              name="dateStart"
                              onChange={event => changeEducation(event, index)}
                              placeholder="10/20/2018"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-4">
                            <label htmlFor="cartInputAddress1">Date de fin *</label>
                            <input
                              type="text"
                              value={education.dateEnd}
                              name="dateEnd"
                              onChange={event => changeEducation(event, index)}
                              placeholder="aujourd'hui"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-4">
                            <label htmlFor="cartInputAddress1">Diplome *</label>
                            <input
                              type="text"
                              value={education.title}
                              name="title"
                              onChange={event => changeEducation(event, index)}
                              placeholder="eg. Master en système d'information"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-lg-6">
                          <div className="mb-4">
                            <label htmlFor="cartInputAddress1">École *</label>
                            <input
                              type="text"
                              value={education.school}
                              name="school"
                              onChange={event => changeEducation(event, index)}
                              placeholder="Central Paris"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="col-12 col-lg-12">
                          <div className="mb-4">
                            <label>Description</label>
                            <textarea
                              type="text"
                              value={education.description}
                              name="description"
                              onChange={event => changeEducation(event, index)}
                              placeholder="eg. ..."
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="col-12 mb-4">
                    <button
                      className="btn btn-outline-primary"
                      style={{width: '100%'}}
                      onClick={() => addEducation()}
                    >
                      <span className="mr-1">
                      <FontAwesomeIcon className="icon-left" icon={faPlus} />
                      </span> Ajouter une éducation
                    </button>
                  </div>
                </div>
                <div className="card-header border-light p-3 mb-4 mb-md-0 highlighted">
                  <h3 className="h5 mb-0">Compétences, intérêts et languages</h3>
                </div>
                <div className="card-body p-0 p-md-4">
                  <div className="row justify-content-center">
                    <div className="col-12 col-lg-12">
                      <div className="mb-4">
                        <label htmlFor="cartInputEmail1">Compétences *</label>
                        <CreatableSelect
                          components={components}
                          inputValue={inputSkill}
                          isClearable
                          isMulti
                          menuIsOpen={false}
                          onChange={handleSkillsChange}
                          onInputChange={handleInputSkillChange}
                          onKeyDown={handleSkillKeyDown}
                          placeholder="python, ruby"
                          value={skills}
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-12">
                      <div className="mb-4">
                        <label htmlFor="cartInputEmail1">langues *</label>
                        <CreatableSelect
                          components={components}
                          inputValue={inputLanguage}
                          isClearable
                          isMulti
                          menuIsOpen={false}
                          onChange={handleLanguagesChange}
                          onInputChange={handleInputLanguageChange}
                          onKeyDown={handleLanguagesKeyDown}
                          placeholder="Anglais, Français"
                          value={languages}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="preview col-12 col-md-6 d-none d-lg-block">
          <div className="resume-wrapper">
            <div className="resume" id="resume">
              <div className="header">
                <div className="header__left">
                  {/* <div className="xlarge bold">John Doe</div> */}
                  <div className="xlarge bold">{firstName ? firstName : 'John'} {lastName ? lastName : 'Doe'}</div>
                  <div className="secondary">
                    <div>
                      Né le {moment(birthDate).format('DD/MM/YYYY')}
                    </div>
                    <div>
                      {moment().diff(moment(birthDate), 'years') || null} ans
                    </div>
                    <div>
                      {familySituation}
                    </div>
                  </div>
                </div> 
                <div className="header__right">
                  <div className="primary mrr1">
                    <div>{address ? address :  '2627 Hanover St, Palo Alto, CA 94304, États-Unis'}</div>
                    <div>{phone ? phone : '00221 55 5 555' }</div>
                    <div>{email ? email : 'john@doe.com'}</div>
                  </div>
                  <div className="photo">
                    <img src={photoPath} />
                  </div>
                </div>
              </div>
              <div className="title center large bold">
                {title ? title : 'Master en Energétique et Rhénologie'}
              </div>
              <div className="divider">
                <div className="divider__border"></div>
                <div className="divider__title bold medium">Expériences Professionnelles</div>
              </div>
              <ul className="list">
                { experiences.map((experience, index) => {
                    return (
                      <li key={`exp-item-${index}`} className="list__item">
                        <div className="list__item-left">{experience.dateStart}-{experience.dateEnd}</div>
                        <div>
                          <div>
                            <span className="bold">{experience.jobTitle}</span>, <span className="italic">{experience.company}</span>
                          </div>
                          <div>
                            {experience.description}
                          </div>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
              <div className="divider">
                <div className="divider__border"></div>
                <div className="divider__title bold medium">Formation</div>
              </div>
              <ul className="list">
                {educations.map((education, index) => {
                  return (
                    <li key={`edu-item-${index}`}  className="list__item">
                      <div className="list__item-left">{education.dateEnd} - {education.dateStart}</div>
                      <div>
                        <div>
                          <span className="bold">{education.title}</span>, <span className="italic">{education.school}</span>
                        </div>
                        <div>
                          {education.description}
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
              <div className="divider">
                <div className="divider__border"></div>
                <div className="divider__title bold medium">Compétences</div>
              </div>
              <ul className="skills">
                {skills.map((skill, index) => {
                  return(
                    <li key={`${skill.value}-${index}`}>{skill.label}</li>
                  )
                })}
              </ul>
              <div className="divider">
                <div className="divider__border"></div>
                <div className="divider__title bold medium">Languages</div>
              </div>
              <ul className="languages">
                {languages.map((language, index) => {
                  return(
                    <li key={`${language.value}-${index}`}>{language.label}</li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-3 button-download">
            <button onClick={() => DownloadFile()} className="button" style={{ width: '70%'}}>
              <FontAwesomeIcon className="icon-left" icon={faDownload} />
              Télécharger
            </button>
          </div>
      </div>
    </Layout>
  )
}


const mapStateToProps = state => ({
  profile: state.profile.profileFile,
})
export default connect(mapStateToProps, { postProfile })(Home)
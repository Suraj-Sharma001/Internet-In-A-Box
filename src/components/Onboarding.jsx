import { useEffect, useState } from 'react'
import { saveJSON } from '../utils/fileSystem'

export default function Onboarding({ open, onClose, dirHandle }) {
  const [answers, setAnswers] = useState({ type: 'college', institution: '', branch: '', interests: '' })

  useEffect(() => {
    if (open) setAnswers({ type: 'college', institution: '', branch: '', interests: '' })
  }, [open])

  const [errors, setErrors] = useState({})

  if (!open) return null

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value })
  }

  const validate = (vals) => {
    const e = {}
    if (!vals.institution || vals.institution.trim().length < 2) e.institution = 'Please enter your institution'
    if (!vals.branch || vals.branch.trim().length < 2) e.branch = 'Please enter your branch or field'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate(answers)
    setErrors(v)
    if (Object.keys(v).length > 0) return
    // save to onboarding.json in chosen directory
    if (!dirHandle) {
      alert('Directory handle not set. Please choose a directory first.')
      return
    }
    await saveJSON(dirHandle, 'onboarding.json', answers)
    onClose(answers)
  }

  return (
    <div className="onboarding modal">
      <div className="modal-content card">
        <h2>Tell us about you</h2>
        <form onSubmit={handleSubmit} className="onboard-form">
          <label>
            Type:
            <select name="type" value={answers.type} onChange={handleChange}>
              <option value="college">College</option>
              <option value="school">School</option>
+              <option value="other">Other</option>
            </select>
          </label>

          <label>
            Institution:
            <input name="institution" value={answers.institution} onChange={handleChange} />
            {errors.institution && <div className="error">{errors.institution}</div>}
          </label>

          <label>
            Branch / Field:
            <input name="branch" value={answers.branch} onChange={handleChange} />
            {errors.branch && <div className="error">{errors.branch}</div>}
          </label>

          <label>
            Interests (comma separated):
            <input name="interests" value={answers.interests} onChange={handleChange} />
          </label>

          <div className="row">
            <button className="btn primary" type="submit">Save & Continue</button>
          </div>
        </form>
      </div>
    </div>
  )
}

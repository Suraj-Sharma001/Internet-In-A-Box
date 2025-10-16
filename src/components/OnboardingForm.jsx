import { useState } from 'react';

const OnboardingForm = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    branch: '',
    interests: [],
    grade: '',
    purpose: ''
  });

  const interestOptions = [
    'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology',
    'Engineering', 'Medicine', 'History', 'Literature', 'Philosophy',
    'Programming', 'Web Development', 'Data Science', 'AI/ML', 'Cybersecurity',
    'Arts', 'Music', 'Languages', 'Business', 'Economics'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onComplete(formData);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4 md:p-8 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0008_1px,transparent_1px),linear-gradient(to_bottom,#00ff0008_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

      <div className="w-[95%] max-w-[1400px] border border-gray-800 rounded-3xl p-6 md:p-10 lg:p-12 xl:p-14 bg-gray-900/80 backdrop-blur-xl shadow-2xl relative z-10 fade-in">
        {/* Progress Bar */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold gradient-text text-white">Step {step} of 3</span>
            <span className="text-gray-400 text-sm">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 border border-gray-700 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-400 via-cyan-500 to-green-600 rounded-full transition-all duration-500 shadow-lg shadow-green-500/50 relative"
              style={{ width: `${(step / 3) * 100}%` }}
            >
              <div className="absolute inset-0 shimmer"></div>
            </div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-8 fade-in">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 float">👋</div>
              <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3 text-white">
                Welcome!
              </h2>
              <p className="text-gray-400 text-xl">Let's Get to Know You</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-3">What's your name?</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full bg-gray-800/50 border-2 border-gray-700 text-gray-200 px-6 py-4 rounded-xl 
                             focus:outline-none focus:border-green-500 transition-all text-lg
                             placeholder-gray-500 backdrop-blur"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-3">Institution (College/School)</label>
                <input
                  type="text"
                  value={formData.institution}
                  onChange={(e) => handleInputChange('institution', e.target.value)}
                  className="w-full bg-gray-800/50 border-2 border-gray-700 text-gray-200 px-6 py-4 rounded-xl 
                             focus:outline-none focus:border-cyan-500 transition-all text-lg
                             placeholder-gray-500 backdrop-blur"
                  placeholder="e.g., MIT, Harvard High School"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-300 mb-3">Branch/Major/Grade</label>
                <input
                  type="text"
                  value={formData.branch}
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  className="w-full bg-gray-800/50 border-2 border-gray-700 text-gray-200 px-6 py-4 rounded-xl 
                             focus:outline-none focus:border-purple-500 transition-all text-lg
                             placeholder-gray-500 backdrop-blur"
                  placeholder="e.g., Computer Science, Grade 12"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Interests */}
        {step === 2 && (
          <div className="space-y-8 fade-in">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 float">🎯</div>
              <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3 text-white">
                Your Interests
              </h2>
              <p className="text-gray-400 text-xl">Select topics you'd like to explore (choose multiple)</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {interestOptions.map(interest => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-sm md:text-base font-semibold
                    ${formData.interests.includes(interest)
                      ? 'bg-gradient-to-br from-green-500 to-cyan-500 text-white border-green-400 shadow-lg shadow-green-500/50 scale-105'
                      : 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-gray-600 hover:bg-gray-800 backdrop-blur'
                    }`}
                >
                  {interest}
                </button>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-900/20 to-cyan-900/20 border border-gray-700 rounded-2xl backdrop-blur">
              <p className="text-gray-300 text-lg">
                <span className="font-bold gradient-text">Selected ({formData.interests.length}):</span>
                {formData.interests.length > 0 ? (
                  <span className="ml-2">{formData.interests.join(', ')}</span>
                ) : (
                  <span className="ml-2 text-gray-500">None yet - select your interests above</span>
                )}
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Purpose */}
        {step === 3 && (
          <div className="space-y-8 fade-in">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 float">🎓</div>
              <h2 className="text-4xl md:text-5xl font-black gradient-text mb-3 text-white">
                Final Step
              </h2>
              <p className="text-gray-400 text-xl">How will you use this system?</p>
            </div>
            
            <div>
              <label className="block text-lg font-semibold text-gray-300 mb-4">Primary Purpose</label>
              <select
                value={formData.purpose}
                onChange={(e) => handleInputChange('purpose', e.target.value)}
                className="w-full bg-gray-800/50 border-2 border-gray-700 text-gray-200 px-6 py-4 rounded-xl 
                           focus:outline-none focus:border-green-500 transition-all text-lg backdrop-blur"
              >
                <option value="">Select a purpose</option>
                <option value="study">📚 Study & Research</option>
                <option value="teaching">👨‍🏫 Teaching</option>
                <option value="personal">🧠 Personal Learning</option>
                <option value="professional">💼 Professional Development</option>
                <option value="emergency">🚨 Emergency Preparedness</option>
                <option value="other">🔧 Other</option>
              </select>
            </div>

            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl p-8 backdrop-blur">
              <h3 className="text-2xl font-bold gradient-text mb-6 flex items-center gap-2 text-white">
                <span>📋</span> Your Profile Summary
              </h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-green-400 font-bold min-w-[140px]">Name:</span>
                  <span className="text-gray-200">{formData.name || 'Not provided'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold min-w-[140px]">Institution:</span>
                  <span className="text-gray-200">{formData.institution || 'Not provided'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-purple-400 font-bold min-w-[140px]">Branch:</span>
                  <span className="text-gray-200">{formData.branch || 'Not provided'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold min-w-[140px]">Interests:</span>
                  <span className="text-gray-200">{formData.interests.length > 0 ? formData.interests.join(', ') : 'None selected'}</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-yellow-400 font-bold min-w-[140px]">Purpose:</span>
                  <span className="text-gray-200">{formData.purpose || 'Not selected'}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-10">
          {step > 1 && (
            <button
              onClick={handleBack}
              className="flex-1 bg-gray-800 border-2 border-gray-700 text-gray-300 py-4 px-8 rounded-xl 
                         hover:bg-gray-700 hover:border-gray-600 transition-all duration-300 font-bold text-lg
                         flex items-center justify-center gap-2"
            >
              <span>←</span> Back
            </button>
          )}
          
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 text-white py-4 px-8 rounded-xl 
                         hover:from-green-600 hover:to-cyan-600 transition-all duration-300 font-bold text-lg
                         shadow-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-[1.02] transform
                         flex items-center justify-center gap-2"
            >
              Next <span>→</span>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="flex-1 neon-button text-white py-4 px-8 rounded-xl 
                         font-bold text-lg relative overflow-hidden group
                         flex items-center justify-center gap-2"
            >
              <span className="relative z-10 flex items-center gap-2">
                🚀 Complete Setup
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;

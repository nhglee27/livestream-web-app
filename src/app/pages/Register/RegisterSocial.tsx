const RegisterSocial = () => (
  <>
    <div className="relative my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-700"></div>
      </div>
      <div className="relative flex justify-center text-sm">
        <span className="px-4 bg-gray-900 text-gray-500">
          OR CONTINUE WITH
        </span>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-3">
      <button className="flex items-center justify-center space-x-2 py-3 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
        <div className="w-5 h-5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
        <span className="text-sm text-gray-300">Google AI</span>
      </button>
      <button className="flex items-center justify-center space-x-2 py-3 rounded-xl border border-gray-700 hover:border-gray-600 transition-colors">
        <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
          <span className="text-xs text-white">GH</span>
        </div>
        <span className="text-sm text-gray-300">GitHub Copilot</span>
      </button>
    </div>

    <p className="text-center text-xs text-gray-500 mt-6">
      Already have an account?{" "}
      <a href="/login" className="text-purple-400 hover:text-purple-300">
        Sign in
      </a>
    </p>
  </>
)

export default RegisterSocial

require 'grape-swagger'

class ApplicationApi < Grape::API
  format :json
  mount PerformancePlus::V1::Base

  add_swagger_documentation hide_documentation_path: true,
                            api_version: 'v1',
                            info: { title: 'People Theplus' }
end

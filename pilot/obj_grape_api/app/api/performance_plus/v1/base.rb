module PerformancePlus
  module V1
    class Base < Grape::API
      mount PerformancePlus::V1::Objectives
      mount PerformancePlus::V1::Users
    end
  end
end

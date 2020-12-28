module PerformancePlus
  class Base < Grape::API
    mount PerformancePlus::V1::Objectives
  end
end

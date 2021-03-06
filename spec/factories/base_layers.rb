# == Schema Information
#
# Table name: base_layers
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  url        :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

FactoryGirl.define do

  sequence :base_layer_slug do |n|
    "slug-#{n}"
  end

  factory :base_layer do

    name 'Layer'

    slug { generate(:base_layer_slug) }

    url 'http://{s}.osm.org/{z}/{x}/{y}.png'

  end

end

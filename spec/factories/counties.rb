# == Schema Information
#
# Table name: counties
#
#  id           :integer          not null, primary key
#  province_id  :integer
#  cdc_id       :string
#  name_p       :string
#  name_c       :string
#  geometry     :geometry({:srid= geometry, 4326
#  demographics :jsonb            default({}), not null
#  choropleths  :jsonb            default({}), not null
#

FactoryGirl.define do
  factory :county do
  end
end

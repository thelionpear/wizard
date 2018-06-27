class Api::UsersController < ApplicationController
  def update
    user = User.find(params[:id])
    user.name = params[:name] if params[:name]
    user.email = params[:email] if params[:email]
    s3 = Aws::S3::Resource.new(region: ENV['AWS_REGION'])
    s3_bucket = ENV['BUCKET']
    file = params[:file]
    begin
      ext = File.extname(file.tempfile)
      obj = s3.bucket(s3_bucket).object("avatars/#{user.id}#{ext}")
      obj.upload_file(file.tempfile, acl: 'public-read')
      user.image = obj.public_url
      if user.save
        render json: user
      else
        render json: { errors: user.errors.full_messages }, status: 422
      end
    rescue => e
      render json: { errors: e }, status: 422
    end
  end
end

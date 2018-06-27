class Api::TagsController < ApplicationController
  def index
    render json: current_user.tags
  end

  def create
    tag = Tag.find_or_create_by(name: params[:tag][:name])
    if !current_user.tags.find_by(id: tag.id)
      Tagging.create(user_id: current_user.id, tag_id: tag.id)
      render json: tag
    end
  end
end

class ContactsController < ApplicationController
  def new
    @contact = Contact.new
  end
  
  def create
    @contact = Contact.new(contact_params)
    
    if @contact.save
      flash[:success] = 'Thanks for your message. An associate will respond as soon as possible.'
      redirect_to new_contact_path
    else
      flash[:danger] = 'An error occurred. Please try again.'
      redirect_to new_contact_path
    end
  
  end
  
  private
    def contact_params
      params.require(:contact).permit(:name, :email, :comments)
    end
end
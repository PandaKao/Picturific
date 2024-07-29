---
name: User Story
about: Default user story template
title: 'Picturific'
assignees: Brian Petros, Stephen Sneed, Justin Kao

---

## User Story:

**AS A** user,  
**I WANT TO** upload photo urls and assign associated keywords,  
**SO THAT** I can filter and view photos in a carousel based on selected keywords, and navigate through search history.

## Acceptance Criteria:

1. [Upload Functionality]
   - Users can upload photo URLs via a modal form.
   - Users can assign up to 3 keywords to each photo.
   - Uploaded photos and their keywords are stored in local storage.

2. [Dropdown Menu]
   - Users can select keywords from a dropdown menu to filter the main carousel.
   - Validation ensures users select between 1-3 keywords.
    
3. [Photo Carousel]
   - The main carousel displays photos filtered by the selected keywords.
   - Users can click a tag to fill the carousel with photos of that keyword.
   - Carousel and tag history are updated in real-time and stored in local-storage.

4. [Tag History]
   - A history of previous tag selections is displayed.
   - Users can view and revert to previous tag selections.
   - Users can navigate back to previous search tags using a previous button.


## Tasks:

1. [Upload Functionality]
   - [ ] Implement a modal for uploading photo URLs
   - [ ] Validate URLs to ensure they are valid image URLs.
   - [ ] Allow users to assign multiple keywords to each uploaded photo
   - [ ] Store uploaded photos and their keywords in local storage.

2. [Dropdown Menu]
   - [ ] Design and implement dropdown menu UI for keyword selection
   - [ ] Implement functionality to display selected keywords.
   - [ ] Implement validation to ensure users select between 1-3 keywords.
   - [ ] Implement a clear function to reset keyword selections.

3. [Main Photo Carousel]
   - [ ] Design and implement the main carousel UI
   - [ ] Implement a filtering mechanism to display photos based on selected keywords.
   - [ ] Implement a keyword buttons within the carousel to filter by specific keywords.
   - [ ] Implement a previous button to navigate back to previous tag selections.
   - [ ] Store and update carousel state and tag history in local storage.'

4. [Tag History]
   - [ ] Implement functionality to display a history of previous tag selections.
   - [ ] Allow users to revert to previous tag selections.
   - [ ] Ensure tag history is updated in real-time and stored in local storage.

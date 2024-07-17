---
name: User Story
about: Default user story template
title: ''
labels: ''
assignees: 

---

## User Story:

**AS A** user,  
**I WANT TO** upload photo urls and assign associated keywords  
**SO THAT** a main photo carousel that displays images based only on the keywords, as well as side carousel that show different photos filtered by individual keyword.

## Acceptance Criteria:

1. [Upload Functionality]
   - Users can upload photo URLs.
   - Users can assign multiple keywords to each photo.

2. [Dropdown Menu]
   - Users can search via dropdown menu for keywords to filter the main carousel.
   - Users can hover over keywords for a tooltip.
    
3. [Main Photo Carousel]
   - The main carousel displays photos filtered by selected keywords.
   - Able to cycle through photos via next and previous buttons.
   - Users can select a filter to display side carousel.
   - Users are able to upvote or downvote keywords.
        
4. [Side Photo Carousel]
   - Each side carousel shows photos related to a single keyword.
   - Side carousel update dynamically based on the selected keyword.
  


## Tasks:

1. [Upload Functionality]
   - [ ] Implement UI for uploading photo URLs
   - [ ] Develop logic for keyword assignments
   - [ ] Validate URLs making sure they are acceptable
   - [ ] Allow users to assign multiple keywords to each uploaded photo
   - [ ] Create user signup feature

2. [Dropdown Menu]
   - [ ] Design dropdown menu UI for keyword selection
   - [ ] Implement search functionality within dropdown menu for filtering keywords
   - [ ] Integrate tooltip functionality for keywords to display additional information on hover.


3. [Main Photo Carousel]
   - [ ] Design and implement main carousel UI
   - [ ] Integrate next and previous buttons for cycling through photos
   - [ ] Implement filtering mechanism based on select keywords
   - [ ] Enable users to upvote or downvote keywords directly from the carousel
   - [ ] Have keywords be removed when reaching zero upvotes
   - [ ] Allow users to add keywords to photos from the carousel

4. [Side Photo Carousel]
   - [ ] Develop UI for displaying side carousel related to selected individual keyword
   - [ ] Implement dynamic updating of side carousel based on selected keyword from main carousel

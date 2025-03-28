const toggle = document.querySelector('.toggle') 
const toggleItems = document.querySelectorAll('.toggle-item') 
const body = document.querySelector('body')
const menuContent = document.querySelector('.menu__content')
const contentLinks = document.querySelectorAll('.content-link') 
const planetLinks = document.querySelectorAll('.planet-link') 
let currentContent = 'overview'
let previousContent = ''
let currentIndex = 2 
const changePlanet = document.querySelectorAll('.change-planet') 
const changeContent = document.querySelectorAll('.change-content') 
const planetGeoImg = document.querySelector('.planet-geo-img') 

import { planetData } from "./globals.js"
import { currentPlanet } from "./globals.js"
import { previousPlanet } from "./globals.js"
import { planetImg } from "./globals.js"
import { statValues } from "./globals.js"
import { standupTextWrapper } from "./globals.js"
import { standupLettersAnim } from "./animations.js"
import { flyOutAnim } from "./animations.js"
import { scaleInAnim } from "./animations.js"
import { roundNumbersAnim } from "./animations.js"
import { flyInAnimComplete } from "./animations.js"
import { staggerLeftAnim } from "./animations.js"



toggle.addEventListener('click', () => {
    
    body.classList.toggle('noscroll')
    toggle.classList.toggle('toggle-active')
    menuContent.classList.toggle('hide') 

    toggleItems.forEach(ele => {
        ele.classList.toggle('active')
    })
    staggerLeftAnim('.toggle-item')
})


planetLinks.forEach(link => {
  link.addEventListener('click', () => {
    switchPlanet(link.classList[1], link.classList[2]) 

    if(link.parentElement.classList.contains('toggle-item')) {
      toggle.classList.remove('toggle-active')
      body.classList.toggle('noscroll')
      menuContent.classList.remove('hide')
      toggleItems.forEach(item => {
        item.classList.remove('active') 
      })
    }

    if(link.parentElement.classList.contains('hide-for-mobile')) {  
      planetLinks.forEach(ele => { 
        ele.classList.remove('active') 
      })
      link.classList.add('active') 
    }
  })
})

contentLinks.forEach(link => {
    link.addEventListener('click', () => {
      if(flyInAnimComplete) { 
        if(!link.classList.contains('content-active')) 
        switchContent(link.classList[1])
        contentLinks.forEach(otherLink => {
            otherLink.classList.remove('content-active')
        })
        link.classList.add('content-active')
      }
    })
})

function switchPlanet(planetName, index) {
  if(planetName === currentPlanet) return null 
    previousPlanet.planetName = currentPlanet.planetName
    currentPlanet.planetName = planetName;
    currentIndex = index
    flyOutAnim(planetImg)
    switchContent('overview')
    if(currentPlanet.planetName) {
        console.log('The current planet is ' + currentPlanet.planetName)
    } else {
        console.error('ERROR planet name not found. The planet name must be the second class on the planet-links element. Do not remove or change this element.')
    }


    changePlanet.forEach(ele => {
        if(ele.classList.contains('animLetters')) {
            ele.innerHTML = planetData[currentIndex].name
            standupLettersAnim(standupTextWrapper, 'animLetter')
        }
        if(ele.classList.contains('rotation')) {
            ele.innerHTML = planetData[currentIndex].rotation
        }
        if(ele.classList.contains('revolution')) {
            ele.innerHTML = planetData[currentIndex].revolution
        }
        if(ele.classList.contains('radius')) {
            ele.innerHTML = planetData[currentIndex].radius
        }
        if(ele.classList.contains('temperature')) {
            ele.innerHTML = planetData[currentIndex].temperature
        }
    })
    roundNumbersAnim(statValues)

    contentLinks.forEach(link => {
      link.classList.remove(previousPlanet.planetName)
      link.classList.add(currentPlanet.planetName)
    })
}

function switchContent(content) {
  currentContent = content
  previousContent = currentContent
    changeContent.forEach(ele => {
        switch(content) {
          case 'overview':
            scaleInAnim(planetImg)
            contentLinks.forEach(link => {
                if(link.classList.contains('overview')) {
                    link.classList.add('content-active')
                } else {
                    link.classList.remove('content-active')
                }
            })
            if(ele.classList.contains('planet-img')) { 
                ele.src = planetData[currentIndex].images.planet
                ele.classList.remove(ele.classList[2]) 
                ele.classList.add(planetData[currentIndex].name.toLowerCase()) 
            }
            planetGeoImg.classList.add('hide')
            if(ele.classList.contains('planet__paragraph')) ele.innerHTML = planetData[currentIndex].overview.content
            if(ele.classList.contains('source')) ele.href = planetData[currentIndex].overview.source
          break;
          case 'structure':
            scaleInAnim(planetImg)
            if(ele.classList.contains('planet-img')) { 
                ele.src = planetData[currentIndex].images.internal
            }
            planetGeoImg.classList.add('hide')
            if(ele.classList.contains('planet__paragraph')) ele.innerHTML = planetData[currentIndex].structure.content
            if(ele.classList.contains('source')) ele.href = planetData[currentIndex].structure.source
          break;
          case 'geology':
            scaleInAnim(planetGeoImg)
            if(ele.classList.contains('planet-img')) { 
                ele.src = planetData[currentIndex].images.planet
            }
            planetGeoImg.src = planetData[currentIndex].images.geology
            planetGeoImg.classList.remove('hide')
            if(ele.classList.contains('planet__paragraph')) ele.innerHTML = planetData[currentIndex].geology.content
            if(ele.classList.contains('source')) ele.href = planetData[currentIndex].geology.source
          break;
        }
    })
}
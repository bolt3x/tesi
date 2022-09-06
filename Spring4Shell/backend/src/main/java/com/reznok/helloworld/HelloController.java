package com.reznok.helloworld;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
public class HelloController {
	
	@CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/greeting")
    public String greetingForm(Model model) {
        model.addAttribute("greeting", new Greeting());
        return "Ciaoooo";
    }
	
	@CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/greeting")
    public String greetingSubmit(@ModelAttribute Greeting greeting, Model model) {
        return "Heyyyyy";
    }

}

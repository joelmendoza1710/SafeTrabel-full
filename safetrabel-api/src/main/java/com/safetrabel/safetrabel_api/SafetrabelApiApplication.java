package com.safetrabel.safetrabel_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.github.javaparser.StaticJavaParser;
import com.github.javaparser.ast.CompilationUnit;
import com.github.javaparser.ast.body.ClassOrInterfaceDeclaration;
import com.github.javaparser.ast.body.MethodDeclaration;
import com.github.javaparser.ast.body.FieldDeclaration;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

@SpringBootApplication
public class SafetrabelApiApplication {

	public static void main(String[] args) throws IOException {
		SpringApplication.run(SafetrabelApiApplication.class, args);



		String projectPath = "src/main/java/com/safetrabel/safetrabel_api"; // Ruta de tu código fuente
        String outputFile = "diagrama.puml";

        StringBuilder plantUML = new StringBuilder("@startuml\n");

        List<File> files = Files.walk(Paths.get(projectPath))
                .filter(Files::isRegularFile)
                .map(java.nio.file.Path::toFile)
                .collect(Collectors.toList());

        for (File file : files) {
            CompilationUnit cu = StaticJavaParser.parse(file);

            cu.findAll(ClassOrInterfaceDeclaration.class).forEach(clazz -> {
                plantUML.append("class ").append(clazz.getName()).append(" {\n");

                clazz.getFields().forEach(field -> plantUML.append("  + ").append(field.getVariable(0).getName()).append("\n"));
                clazz.getMethods().forEach(method -> plantUML.append("  + ").append(method.getName()).append("()\n"));

                plantUML.append("}\n");
            });
        }

        plantUML.append("@enduml");

        FileWriter writer = new FileWriter(outputFile);
        writer.write(plantUML.toString());
        writer.close();

        System.out.println("Diagrama generado en " + outputFile);
    }
	

}

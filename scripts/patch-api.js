const fs = require('fs');
const path = require('path');

const filesToPatch = [
  path.join(__dirname, '../src/lib/services/generated/frontend/index.ts'),
  path.join(__dirname, '../src/lib/services/generated/node/index.ts')
];

// Updated pattern to be more flexible with whitespace
const brokenPattern = /if\s*\(registerForEventBody\.Documents !== undefined && registerForEventBody\.Documents !== null\)\s*{\s*formData\.append\(`Documents`,\s*registerForEventBody\.Documents\);\s*}\s*if\s*\(registerForEventBody\.Members !== undefined && registerForEventBody\.Members !== null\)\s*{\s*formData\.append\(`Members`,\s*registerForEventBody\.Members\);\s*}\s*if\s*\(registerForEventBody\.RegistrationColleges !== undefined && registerForEventBody\.RegistrationColleges !== null\)\s*{\s*formData\.append\(`RegistrationColleges`,\s*registerForEventBody\.RegistrationColleges\);\s*}/g;

const fixContent = `if(registerForEventBody.Documents !== undefined && registerForEventBody.Documents !== null) {
 registerForEventBody.Documents.forEach(value => formData.append(\`Documents\`, value));
 }
if(registerForEventBody.Members !== undefined && registerForEventBody.Members !== null) {
 registerForEventBody.Members.forEach((value, index) => {
  Object.entries(value).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      formData.append(\`Members[\${index}].\${key}\`, val instanceof Blob ? val : String(val));
    }
  });
});
 }
if(registerForEventBody.RegistrationColleges !== undefined && registerForEventBody.RegistrationColleges !== null) {
 registerForEventBody.RegistrationColleges.forEach((value, index) => {
  Object.entries(value).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      formData.append(\`RegistrationColleges[\${index}].\${key}\`, val instanceof Blob ? val : String(val));
    }
  });
});
 }`;

filesToPatch.forEach(filePath => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    // Check for a simpler pattern if the complex regex fails
    const simplePattern = /formData\.append\(`Documents`, registerForEventBody\.Documents\);/g;
    
    if (content.match(brokenPattern)) {
      content = content.replace(brokenPattern, fixContent);
      fs.writeFileSync(filePath, content);
      console.log(`✅ Patched (Regex): ${filePath}`);
    } else if (content.match(simplePattern)) {
        // Fallback to manual replacement of blocks if the specific sequence is found
        content = content.replace(/if\(registerForEventBody\.Documents !== undefined && registerForEventBody\.Documents !== null\) \{\s+formData\.append\(`Documents`, registerForEventBody\.Documents\);\s+\}/g, 
            `if(registerForEventBody.Documents !== undefined && registerForEventBody.Documents !== null) { registerForEventBody.Documents.forEach(value => formData.append(\`Documents\`, value)); }`);
        
        content = content.replace(/if\(registerForEventBody\.Members !== undefined && registerForEventBody\.Members !== null\) \{\s+formData\.append\(`Members`, registerForEventBody\.Members\);\s+\}/g,
            `if(registerForEventBody.Members !== undefined && registerForEventBody.Members !== null) { registerForEventBody.Members.forEach((value, index) => { Object.entries(value).forEach(([key, val]) => { if (val !== undefined && val !== null) { formData.append(\`Members[\${index}].\${key}\`, val instanceof Blob ? val : String(val)); } }); }); }`);

        content = content.replace(/if\(registerForEventBody\.RegistrationColleges !== undefined && registerForEventBody\.RegistrationColleges !== null\) \{\s+formData\.append\(`RegistrationColleges`, registerForEventBody\.RegistrationColleges\);\s+\}/g,
            `if(registerForEventBody.RegistrationColleges !== undefined && registerForEventBody.RegistrationColleges !== null) { registerForEventBody.RegistrationColleges.forEach((value, index) => { Object.entries(value).forEach(([key, val]) => { if (val !== undefined && val !== null) { formData.append(\`RegistrationColleges[\${index}].\${key}\`, val instanceof Blob ? val : String(val)); } }); }); }`);

        fs.writeFileSync(filePath, content);
        console.log(`✅ Patched (Manual Fallback): ${filePath}`);
    } else {
      console.log(`⚠️ Could not find pattern to patch in ${filePath}`);
    }
  } else {
    console.log(`❌ File not found: ${filePath}`);
  }
});

pipeline {
  agent any

  tools {
    nodejs 'Node 22'
  }

  environment {
    CI = 'true'
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm ci'
      }
    }

    stage('Install Playwright browser') {
      steps {
        bat 'npx playwright install chromium'
      }
    }
stage('Check Network') {
    steps {
        bat 'curl -I https://playwright.dev/'
        bat 'node -e "require(\"https\").get(\"https://playwright.dev/\", r => console.log(r.statusCode)).on(\"error\", e => console.error(e.message))"'
    }
}
    stage('Run Playwright tests') {
      steps {
        bat 'npx playwright test tests/example.spec.ts'
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**,test-results/**', allowEmptyArchive: true

      publishHTML(target: [
        allowMissing: true,
        alwaysLinkToLastBuild: true,
        keepAll: true,
        reportDir: 'playwright-report',
        reportFiles: 'index.html',
        reportName: 'Playwright Report'
      ])
    }
  }
}

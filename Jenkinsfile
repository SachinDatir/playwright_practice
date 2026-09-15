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
stage('Check external connectivity') {
  steps {
    bat '''
      powershell -NoProfile -Command "Invoke-WebRequest -Uri 'https://www.saucedemo.com/' -UseBasicParsing -TimeoutSec 30 | Select-Object -ExpandProperty StatusCode"
    '''
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

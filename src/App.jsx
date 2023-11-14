import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Leftsidepanel from "./components/Leftsidepanel/Leftsidepanel";
import Rightsidepanel from "./components/Rightsidepanel/Rightsidepanel";
import Reportsection from "./components/Reportsection/Reportsection";
// import { list } from "postcss";

class Taxpayer {
  constructor(newUser = {}) {
    this.name = newUser.name || "";
    this.surveyResult = newUser.surveyResult || {
      0: {
        status: "pending",
        answer: "",
        isValid: false,
        description: "Date of arrival",
      },
      1: {
        status: "pending",
        answer: "",
        description:
          "Question 1 for double check whether user is a UK resident",
      },
      2: {
        status: "pending",
        answer: "",
        description:
          "Question 2 for double check whether user is a UK resident",
      },
      3: {
        status: "pending",
        answer: "",
        description: "Result of the survey",
      },
    };
    this.taxpayerAnswer = newUser.taxpayerAnswer || {
      0: {
        status: "pending",
        answer: 0,
        description: "Earn from being in employment in the UK",
      },
      1: {
        status: "pending",
        answer: 0,
        description: "Earn from being self-employed excluding foregin income",
      },
      2: {
        status: "pending",
        answer: 0,
        description: "Earn from freelance work",
      },
      3: {
        status: "pending",
        answer: 0,
        description: "Earn from local rental income",
      },
      4: {
        status: "pending",
        answer: "",
        description: "A boolean whether the user has foreign income or not",
      },
      5: {
        status: "pending",
        answer: 0,
        description: "Earn from oversea company",
      },
      6: {
        status: "pending",
        answer: 0,
        description: "Earn from job outside the UK",
      },
      7: {
        status: "pending",
        answer: 0,
        description: "Earn from oversea interest",
      },
      8: {
        status: "pending",
        answer: 0,
        description: "Earn from oversea dividend",
      },
      9: {
        status: "pending",
        answer: 0,
        description: "Earn from oversea rental income",
      },
      10: {
        status: "pending",
        answer: 0,
        description: "Earn from interest in savings in the UK",
      },
      11: {
        status: "pending",
        answer: 0,
        description: "Earn from dividend in the UK",
      },
    };
    this.numOfDaysFromArrival = newUser.numOfDaysFromArrival || 0;

    this.wages = newUser.wages || { status: "pending", answer: 0 };
    this.tradingBeforeAllowance = newUser.tradingBeforeAllowance || {
      status: "pending",
      answer: 0,
    };
    this.tradingAfterAllowance = newUser.tradingAfterAllowance || {
      status: "pending",
      answer: 0,
    };
    this.tradingAllowanceApplied = newUser.tradingAllowanceApplied || {
      status: "pending",
      answer: 0,
    };
    this.propertyBeforeAllowance = newUser.propertyBeforeAllowance || {
      status: "pending",
      answer: 0,
    };
    this.propertyAfterAllowance = newUser.propertyAfterAllowance || {
      status: "pending",
      answer: 0,
    };
    this.propertyAllowanceApplied = newUser.propertyAllowanceApplied || {
      status: "pending",
      answer: 0,
    };
    this.totalIncome = newUser.totalIncome || {
      status: "pending",
      answer: 0,
    };
    this.nonSavingsIncome = newUser.nonSavingsIncome || {
      status: "pending",
      answer: 0,
    };
    this.taxOnNonSavingsIncome = newUser.taxOnNonSavingsIncome || {
      status: "pending",
      answer: 0,
    };
    this.taxOnNonSavingsIncomeCalculation =
      newUser.taxOnNonSavingsIncomeCalculation || {
        status: "pending",
        answer: "",
      };
    this.dividend = newUser.dividend || { status: "pending", answer: 0 };
    this.taxOnDividend = newUser.taxOnDividend || {
      status: "pending",
      answer: 0,
    };
    this.taxOnDividendCalculation = newUser.taxOnDividendCalculation || {
      status: "pending",
      answer: "",
    };
    this.interest = newUser.interest || { status: "pending", answer: 0 };
    this.taxOnInterest = newUser.taxOnInterest || {
      status: "pending",
      answer: 0,
    };
    this.taxOnInterestCalculation = newUser.taxOnInterestCalculation || {
      status: "pending",
      answer: "",
    };
    this.taxPaid = newUser.taxPaid || {
      status: "pending",
      answer: 0,
    };
    this.band = newUser.band || {
      status: "pending",
      answer: "",
    };
  }

  checkValidDateFormat(input) {
    if (!isNaN(Date.parse(input))) {
      this.surveyResult[0].isValid = true;
    } else {
      this.surveyResult[0].isValid = false;
    }
  }

  calculateNumOfDaysFromArrival(inputDate) {
    var arrivalDate = new Date(inputDate);
    var today = new Date();
    var timeDiff = today.getTime() - arrivalDate.getTime();
    // Use Math.ceil to get a whole number
    this.numOfDaysFromArrival = Math.ceil(timeDiff / (1000 * 3600 * 24));
  }

  setSurveyResultBackToInitial(count) {
    this.surveyResult[count].status = "pending";
    this.surveyResult[count].answer = "";
  }

  setSurveyResultStatusToAllAnswered() {
    // this.surveyResult[0].status = "answered";
    // this.surveyResult[1].status = "answered";
    // this.surveyResult[2].status = "answered";
    // this.surveyResult[3].status = "answered";
    for (var i = 0; i < Object.keys(this.surveyResult).length; i++) {
      this.surveyResult[i].status = "answered";
    }
  }

  setTaxpayerAnswerStatusToAllSkipped() {
    for (var i = 0; i < Object.keys(this.taxpayerAnswer).length; i++) {
      this.taxpayerAnswer[i].status = "skipped";
    }
  }

  // calculateTaxPaid() {
  //   var newArr = [
  //     ...Object.values(this.taxpayerAnswer).slice(0, 4),
  //     ...Object.values(this.taxpayerAnswer).slice(5),
  //   ];
  //   var sum = newArr.reduce((a, b) => a + b.answer, 0) + 1000;
  //   this.taxPaid = sum;
  // }
  calculateTaxPaid() {
    // Convert the taxpayerAnswer object to an array
    var arr = Object.values(this.taxpayerAnswer);

    // deductAllowance can be used
    // for trading allowance, property allowance,
    // dividend allowance, personal savings allowance
    // and starting rate for savings
    function deductAllowance(income, allowance) {
      if (income <= allowance) {
        return 0;
      } else {
        return income - allowance;
      }
    }

    // remainPersonalAllowance can be used
    // in non-savings income, dividend and interest
    function remainPersonalAllowance(income, allowance) {
      if (income <= allowance) {
        return allowance - income;
      } else {
        return 0;
      }
    }

    var wages = arr[0].answer;
    this.wages.answer = wages;
    this.wages.status = "calculated";

    var trading = arr[1].answer + arr[2].answer + arr[5].answer + arr[6].answer;
    this.tradingBeforeAllowance.answer = trading;
    this.tradingAfterAllowance.answer = deductAllowance(trading, 1000);
    this.tradingAllowanceApplied.answer =
      trading - deductAllowance(trading, 1000);
    this.tradingBeforeAllowance.status = "calculated";
    this.tradingAfterAllowance.status = "calculated";
    this.tradingAllowanceApplied.status = "calculated";

    var property = arr[3].answer + arr[9].answer;
    this.propertyBeforeAllowance.answer = property;
    this.propertyAfterAllowance.answer = deductAllowance(property, 1000);
    this.propertyAllowanceApplied.answer =
      property - deductAllowance(property, 1000);
    this.propertyBeforeAllowance.status = "calculated";
    this.propertyAfterAllowance.status = "calculated";
    this.propertyAllowanceApplied.status = "calculated";

    var dividend = arr[8].answer + arr[11].answer;
    var interest = arr[7].answer + arr[10].answer;

    // Total income is wages + trading + property + dividend + interest
    // Simpified calculation for trading allowance and property allowance
    // is apply, which deduct 1000 in maximum.
    // The detailed calculation can be found here:
    // https://www.litrg.org.uk/tax-guides/savers-property-owners-and-other-tax-issues/property-income/renting-out-property#toc-how-does-the-property-allowance-work-
    // https://www.litrg.org.uk/tax-guides/self-employment/what-trading-allowance
    var totalIncome =
      wages +
      deductAllowance(trading, 1000) +
      deductAllowance(property, 1000) +
      dividend +
      interest;

    // The personal allowance is 12570
    var personalAllowance = 12570;

    if (totalIncome <= personalAllowance) {
      // Apply personal allowance tax band

      // The band is personal allowance
      var band = "Personal Allowance";

      // The tax should be 0 if the total income is less than personal allowance
      // This is for calculating non-savings income
      var nonSavingsIncome = totalIncome - dividend - interest;
      // Zero tax rate for non-savings income within personal allowance
      var taxOnNonSavingsIncome = 0;
      // Showing the calculation for non-savings income in Left Side Panel
      this.taxOnNonSavingsIncomeCalculation.answer =
        "£" +
        nonSavingsIncome +
        " - £" +
        personalAllowance +
        "(Personal Allowance)";
      this.taxOnNonSavingsIncomeCalculation.status = "calculated";
      // Zero tax rate for dividend within personal allowance
      var taxOnDividend = 0;
      // Showing the calculation for dividend in Left Side Panel
      this.taxOnDividendCalculation.answer =
        "£" + dividend + " - Dividend Allowance - Remain Personal Allowance";
      this.taxOnDividendCalculation.status = "calculated";
      // Zero tax rate for interest within personal allowance
      var taxOnInterest = 0;
      // Showing the calculation for interest in Left Side Panel
      this.taxOnInterestCalculation.answer =
        "£" +
        interest +
        " - Starting Rate For Savings - Personal Savings Allowance - Remain Personal Allowance";
      this.taxOnInterestCalculation.status = "calculated";
    } else if (totalIncome > personalAllowance && totalIncome <= 50270) {
      // Apply basic rate

      // The band is basic rate
      band = "Basic Rate";

      // Total income minus dividend and interest is non savings income,
      // then minus personal allowance to get the income to be taxed.
      // Please refer to the example in https://www.gov.uk/tax-on-dividends
      nonSavingsIncome = totalIncome - dividend - interest;
      // taxOnNonSavingsIncome = (nonSavingsIncome - personalAllowance) * 0.2;
      taxOnNonSavingsIncome =
        deductAllowance(nonSavingsIncome, personalAllowance) * 0.2;
      // Showing the calculation for non-savings income in Left Side Panel
      this.taxOnNonSavingsIncomeCalculation.answer =
        "(£" +
        nonSavingsIncome +
        " - £" +
        personalAllowance +
        " (Personal Allowance)) * 20%";
      this.taxOnNonSavingsIncomeCalculation.status = "calculated";

      // Deduct dividend allowance
      var dividendAfterAllowance = deductAllowance(dividend, 2000);
      // Find out the the remain Personal Allowance
      var remainPersonalAllowanceValue01 = remainPersonalAllowance(
        nonSavingsIncome,
        personalAllowance
      );
      // Deduct remain Personal Allowance if applicable
      // to get the dividend to be taxed.
      var dividendAfterRemainPersonalAllowance = deductAllowance(
        dividendAfterAllowance,
        remainPersonalAllowanceValue01
      );
      // The basic rate tax band for dividend is 8.75%.
      taxOnDividend = dividendAfterRemainPersonalAllowance * 0.0875;
      // Showing the calculation for dividend in Left Side Panel
      this.taxOnDividendCalculation.answer =
        "(£" +
        dividend +
        " - £2000 (Dividend Allowance) - £" +
        remainPersonalAllowanceValue01 +
        " (Remain Personal Allowance)) * 8.75%";
      this.taxOnDividendCalculation.status = "calculated";
      // The basic rate tax band for interest is 20%,
      // which is treating interest as normal income.
      // The personal savings allowance for basic rate is 1000,
      // and starting rate for savings is to be calculated,
      // please refer to the example in https://www.gov.uk/apply-tax-free-interest-on-savings
      var otherIncomeForTaxOnInterest = totalIncome - interest;
      var remaining = otherIncomeForTaxOnInterest - personalAllowance;
      // 5000 is the maximum of starting rate for savings
      // The if statement is to find out the starting rate for savings
      if (remaining > 5000) {
        var startingRateForSavings = 0;
      } else {
        startingRateForSavings = 5000 - remaining;
      }
      // The interest deducts the personal savings allowance,
      // which is 1000 for basic rate tax band
      var interestAfterPersonalSavingsAllowance = deductAllowance(
        interest,
        1000
      );
      // The above value deducts the calculated starting rate for savings
      var interestAfterStartingRateForSavings = deductAllowance(
        interestAfterPersonalSavingsAllowance,
        startingRateForSavings
      );
      // Find out the the remain Personal Allowance
      // this method is similar with dividendAfterRemainPersonalAllowance
      // The only different is this method is finding the remaining,
      // while dividendAfterRemainPersonalAllowance is finding the deducted value.
      var remainPersonalAllowanceValue02 = remainPersonalAllowance(
        dividendAfterAllowance,
        remainPersonalAllowanceValue01
      );

      // Deduct remain Personal Allowance if applicable
      // to get the interest to be taxed.
      var interestAfterPersonalAllowance = deductAllowance(
        interestAfterStartingRateForSavings,
        remainPersonalAllowanceValue02
      );
      // The basic rate tax band for interest is 20%,
      // which is treating interest as normal income.
      taxOnInterest = interestAfterPersonalAllowance * 0.2;
      // Showing the calculation for interest in Left Side Panel
      this.taxOnInterestCalculation.answer =
        "(£" +
        interest +
        " - £" +
        startingRateForSavings +
        " (Starting rate for savings)" +
        " - £1000 (Personal Saving Allowance) - £" +
        remainPersonalAllowanceValue02 +
        " (Remain Personal Allowance)) * 20%";
      this.taxOnInterestCalculation.status = "calculated";
    } else if (totalIncome > 50270 && totalIncome <= 125140) {
      // Apply higher rate

      // The band is higher rate
      band = "Higher Rate";

      // Adjust personal allowance for adjusted net income
      // more than £100,000.
      // Plese refer to https://www.gov.uk/income-tax-rates/income-over-100000
      var netIncome = wages + trading + property + dividend + interest;
      if (netIncome <= 100000) {
        personalAllowance = 12570;
      } else if (netIncome > 100000 && netIncome <= 125140) {
        personalAllowance = 12570 - (netIncome - 100000) / 2;
      } else if (netIncome > 125140) {
        personalAllowance = 0;
      }

      // Higher rate tax band is 40% for wage between 50270 and 125140
      // Basic rate tax band is 20% for wage between 12570 and 50270
      nonSavingsIncome = totalIncome - dividend - interest;
      if (nonSavingsIncome > 50270) {
        // The income between value and 50270 is taxed at 40%,
        // the income between 50270 and personal allowance is taxed at 20%.
        taxOnNonSavingsIncome =
          (nonSavingsIncome - 50270) * 0.4 + (50270 - personalAllowance) * 0.2;
        // Showing the calculation for non-savings income in Left Side Panel
        this.taxOnNonSavingsIncomeCalculation.answer =
          "(£" +
          nonSavingsIncome +
          " - £50270) * 40% + (£50270 - £" +
          personalAllowance +
          " (Personal Allowance)) * 20%";
        this.taxOnNonSavingsIncomeCalculation.status = "calculated";
      } else if (nonSavingsIncome > 12570 && nonSavingsIncome <= 50270) {
        // the income between 50270 and personal allowance is taxed at 20%.
        taxOnNonSavingsIncome = (nonSavingsIncome - personalAllowance) * 0.2;
        // Showing the calculation for non-savings income in Left Side Panel
        this.taxOnNonSavingsIncomeCalculation.answer =
          "(£" +
          nonSavingsIncome +
          " - £" +
          personalAllowance +
          "(Personal Allowance)) * 20%";
        this.taxOnNonSavingsIncomeCalculation.status = "calculated";
      } else if (nonSavingsIncome <= 12570) {
        // the income below personal allowance is taxed at 0%.
        taxOnNonSavingsIncome = 0;
        // Showing the calculation for non-savings income in Left Side Panel
        this.taxOnNonSavingsIncomeCalculation.answer =
          "(£" +
          nonSavingsIncome +
          " - £" +
          personalAllowance +
          " (Personal Allowance)) * 0%";
        this.taxOnNonSavingsIncomeCalculation.status = "calculated";
      }
      // Deduct dividend allowance
      dividendAfterAllowance = deductAllowance(dividend, 2000);
      // Find out the the remain Personal Allowance
      remainPersonalAllowanceValue01 = remainPersonalAllowance(
        nonSavingsIncome,
        personalAllowance
      );
      // Deduct remain Personal Allowance if applicable
      // to get the dividend to be taxed.
      dividendAfterRemainPersonalAllowance = deductAllowance(
        dividendAfterAllowance,
        remainPersonalAllowanceValue01
      );
      // The higher rate tax band for dividend is 33.75%.
      taxOnDividend = dividendAfterRemainPersonalAllowance * 0.3375;
      // Showing the calculation for dividend in Left Side Panel
      this.taxOnDividendCalculation.answer =
        "(£" +
        dividend +
        " - £2000 (Dividend Allowance) - £" +
        remainPersonalAllowanceValue01 +
        " (Remain Personal Allowance)) * 33.75%";
      this.taxOnDividendCalculation.status = "calculated";

      // The starting rate for savings is 0 for higher rate tax band,
      // which is not included in the calculation.
      // startingRateForSavings = 0;

      // The interest deducts the personal savings allowance,
      // which is 500 for higher rate tax band
      interestAfterPersonalSavingsAllowance = deductAllowance(interest, 500);

      // Find out the the remain Personal Allowance
      // this method is similar with dividendAfterRemainPersonalAllowance
      // The only different is this method is finding the remaining,
      // while dividendAfterRemainPersonalAllowance is finding the deducted value.
      remainPersonalAllowanceValue02 = remainPersonalAllowance(
        dividendAfterAllowance,
        remainPersonalAllowanceValue01
      );

      // Deduct remain Personal Allowance if applicable
      // to get the interest to be taxed.
      interestAfterPersonalAllowance = deductAllowance(
        interestAfterPersonalSavingsAllowance,
        remainPersonalAllowanceValue02
      );

      // The higher rate tax band for interest is 40%,
      // which is treating interest as normal income.
      taxOnInterest = interestAfterPersonalAllowance * 0.4;
      // Showing the calculation for interest in Left Side Panel
      this.taxOnInterestCalculation.answer =
        "(£" +
        interest +
        " - £500 (Personal Savings Allowance) - £" +
        remainPersonalAllowanceValue02 +
        " (Remain Personal Allowance)) * 40%";
      this.taxOnInterestCalculation.status = "calculated";
    } else if (totalIncome > 125140) {
      // Apply additional rate

      // The band is additional rate
      band = "Additional Rate";

      // Adjust personal allowance for adjusted net income
      // more than £100,000.
      // Plese refer to https://www.gov.uk/income-tax-rates/income-over-100000
      var netIncome = wages + trading + property + dividend + interest;
      if (netIncome <= 100000) {
        personalAllowance = 12570;
      } else if (netIncome > 100000 && netIncome <= 125140) {
        personalAllowance = 12570 - (netIncome - 100000) / 2;
      } else if (netIncome > 125140) {
        personalAllowance = 0;
      }

      // Additional rate tax band is 45% for wage above 125140
      // Higher rate tax band is 40% for wage between 50270 and 125140
      // Basic rate tax band is 20% for wage between 12570 and 50270
      nonSavingsIncome = totalIncome - dividend - interest;
      if (nonSavingsIncome > 125140) {
        // The income between value and 125140 is taxed at 45%,
        // the income between 125140 and 50270 is taxed at 40%,
        // the income between 50270 and personal allowance is taxed at 20%.
        taxOnNonSavingsIncome =
          (nonSavingsIncome - 125140) * 0.45 +
          (125140 - 50270) * 0.4 +
          (50270 - personalAllowance) * 0.2;
        // Showing the calculation for non-savings income in Left Side Panel
        this.taxOnNonSavingsIncomeCalculation.answer =
          "(£" +
          nonSavingsIncome +
          " - £125140) * 45% + (£125140 - £50270) * 40% + (£50270 - £" +
          personalAllowance +
          " (Personal Allowance)) * 20%";
        this.taxOnNonSavingsIncomeCalculation.status = "calculated";
      } else if (nonSavingsIncome > 50270 && nonSavingsIncome <= 125140) {
        // The income between value and 50270 is taxed at 40%,
        // the income between 50270 and personal allowance is taxed at 20%.
        taxOnNonSavingsIncome =
          (nonSavingsIncome - 50270) * 0.4 + (50270 - personalAllowance) * 0.2;
        // Showing the calculation for non-savings income in Left Side Panel
        this.taxOnNonSavingsIncomeCalculation.answer =
          "(£" +
          nonSavingsIncome +
          " - £50270) * 40% + (£50270 - £" +
          personalAllowance +
          " (Personal Allowance)) * 20%";
        this.taxOnNonSavingsIncomeCalculation.status = "calculated";
      } else if (nonSavingsIncome > 12570 && nonSavingsIncome <= 50270) {
        // The income between value and personal allowance is taxed at 20%.
        taxOnNonSavingsIncome = (nonSavingsIncome - personalAllowance) * 0.2;
        // Showing the calculation for non-savings income in Left Side Panel
        this.taxOnNonSavingsIncomeCalculation.answer =
          "(£" +
          nonSavingsIncome +
          " - £" +
          personalAllowance +
          " (Personal Allowance)) * 20%";
        this.taxOnNonSavingsIncomeCalculation.status = "calculated";
      } else if (nonSavingsIncome <= 12570) {
        // the income below personal allowance is taxed at 0%.
        taxOnNonSavingsIncome = 0;
        // Showing the calculation for non-savings income in Left Side Panel
        this.taxOnNonSavingsIncomeCalculation.answer =
          "(£" +
          nonSavingsIncome +
          " - £" +
          personalAllowance +
          " (Personal Allowance)) * 0%";
        this.taxOnNonSavingsIncomeCalculation.status = "calculated";
      }
      // Deduct dividend allowance
      dividendAfterAllowance = deductAllowance(dividend, 2000);
      // Find out the the remain Personal Allowance
      remainPersonalAllowanceValue01 = remainPersonalAllowance(
        nonSavingsIncome,
        personalAllowance
      );
      // Deduct remain Personal Allowance if applicable
      // to get the dividend to be taxed.
      dividendAfterRemainPersonalAllowance = deductAllowance(
        dividendAfterAllowance,
        remainPersonalAllowanceValue01
      );
      // The additional rate tax band for dividend is 39.35%.
      taxOnDividend = dividendAfterRemainPersonalAllowance * 0.3935;
      // Showing the calculation for dividend in Left Side Panel
      this.taxOnDividendCalculation.answer =
        "(£" +
        dividend +
        " - £2000 (Dividend Allowance) - £" +
        remainPersonalAllowanceValue01 +
        " (Remain Personal Allowance)) * 39.35%";
      this.taxOnDividendCalculation.status = "calculated";

      // The starting rate for savings is 0 for additional rate tax band,
      // which is not included in the calculation.
      // startingRateForSavings = 0;

      // The personal savings allowance is 0 for additional rate tax band,
      // which is not included in the calculation.

      // Find out the the remain Personal Allowance
      // this method is similar with dividendAfterRemainPersonalAllowance
      // The only different is this method is finding the remaining,
      // while dividendAfterRemainPersonalAllowance is finding the deducted value.
      remainPersonalAllowanceValue02 = remainPersonalAllowance(
        dividendAfterAllowance,
        remainPersonalAllowanceValue01
      );

      // Deduct remain Personal Allowance if applicable
      // to get the interest to be taxed.
      interestAfterPersonalAllowance = deductAllowance(
        interest,
        remainPersonalAllowanceValue02
      );

      // The additional rate tax band for interest is 45%,
      // which is treating interest as normal income.
      taxOnInterest = interestAfterPersonalAllowance * 0.45;
      // Showing the calculation for interest in Left Side Panel
      this.taxOnInterestCalculation.answer =
        "(£" +
        interest +
        " - £" +
        remainPersonalAllowanceValue02 +
        " (Remain Personal Allowance)) * 45%";
      this.taxOnInterestCalculation.status = "calculated";
    }
    this.totalIncome.answer = totalIncome;
    this.totalIncome.status = "calculated";
    this.nonSavingsIncome.answer = nonSavingsIncome;
    this.nonSavingsIncome.status = "calculated";
    this.taxOnNonSavingsIncome.answer = taxOnNonSavingsIncome;
    this.taxOnNonSavingsIncome.status = "calculated";
    this.dividend.answer = dividend;
    this.dividend.status = "calculated";
    this.taxOnDividend.answer = taxOnDividend;
    this.taxOnDividend.status = "calculated";
    this.interest.answer = interest;
    this.interest.status = "calculated";
    this.taxOnInterest.answer = taxOnInterest;
    this.taxOnInterest.status = "calculated";
    this.taxPaid.answer = taxOnNonSavingsIncome + taxOnDividend + taxOnInterest;
    this.taxPaid.status = "calculated";
    this.band.answer = band;
    this.band.status = "calculated";
  }

  setName(answer) {
    this.name = answer;
  }

  setSurveyResult(questionNumber, answer) {
    this.surveyResult[questionNumber].answer = answer;
  }

  getSurveyResultStatus() {
    return this.surveyResult[0].status;
  }

  setSurveyResultStatus(questionNumber, status) {
    this.surveyResult[questionNumber].status = status;
  }

  setTaxpayerAnswer(questionNumber, answer) {
    this.taxpayerAnswer[questionNumber].answer = answer;
  }

  getTaxpayerAnswerStatus(questionNumber) {
    return this.taxpayerAnswer[questionNumber].status;
  }

  setTaxpayerAnswerStatus(questionNumber, status) {
    this.taxpayerAnswer[questionNumber].status = status;
  }

  isAllTaxpayerAnswerStatusAnswered() {
    var isAllAnswered = true;
    for (var i = 0; i < Object.keys(this.taxpayerAnswer).length; i++) {
      if (this.taxpayerAnswer[i].status === "pending") {
        isAllAnswered = false;
        break;
      }
    }
    return isAllAnswered;
  }
}

function App() {
  // Create the first user and add it to the list of users.
  const firstUser = new Taxpayer({ name: "New User" });

  const [listofUsers, setListofUsers] = useState([firstUser]);
  const [userIndex, setUserIndex] = useState(0);
  const [isStateUpdated, setIsStateUpdated] = useState(false);
  const [stage, setStage] = useState(0);
  const [count, setCount] = useState(0);
  const [isImport, setIsImport] = useState(false);

  const botQuestion = [
    [
      {
        question: "Welcome new user! Please enter your name: ",
        answerType: "string",
      },
    ],
    [
      {
        question:
          "Which day did you arrive UK? Please answer the question in the form MM/DD/YYYY.",
        answerType: "string",
      },
      {
        question:
          "Was your only home in the UK for 91 days or more in a row - and you visited or stayed in it for at least 30 days of the tax year?",
        answerType: "boolean",
      },
      {
        question:
          "Did you work full-time in the UK for any period of 365 days and at least one day of that period was in the tax year you’re checking?",
        answerType: "boolean",
      },
    ],
    [
      {
        question: "How much you earn from being in employment in the UK?",
        answerType: "floatNumber",
      },
      {
        question:
          "How much you earn from being self-employed excluding the foreign income?",
        answerType: "floatNumber",
      },
      {
        question: "How much you earn from freelance work?",
        answerType: "floatNumber",
      },
      {
        question:
          "How much you earn from rental income, where the properties are in the UK? (Please add together your rental incomes and deduct any expenses.)",
        answerType: "floatNumber",
      },
      {
        question:
          "Do you have any foregin income? Any income that generated outside the UK is counted as foregin income, which includes: Profit generated from your company outside the UK, interest from overseas bank and building society accounts, dividends and interest from overseas companies, rent from overseas properties, wages, benefits or royalties from working abroad, pensions you receive from abroad, income from a trust based abroad, income from a life insurance policy.",
        answerType: "boolean",
      },
      {
        question: "How much you earn from your oversea company?",
        answerType: "floatNumber",
      },
      {
        question: "How much you earn from your job outside the UK?",
        answerType: "floatNumber",
      },
      {
        question:
          "How much you earn from the oversea interest i.e. from bank, securities company, insurance company?",
        answerType: "floatNumber",
      },
      {
        question:
          "How much you earn from the oversea dividend i.e. from stock, insurance company?",
        answerType: "floatNumber",
      },
      {
        question: "How much you earn from the rental income outside the UK?",
        answerType: "floatNumber",
      },
      {
        question:
          "How much you earn from the interest in your savings in the UK?",
        answerType: "floatNumber",
      },
      {
        question: "How much you earn from the dividend in the UK?",
        answerType: "floatNumber",
      },
    ],
  ];

  // This useEffect is to trigger re-renders when the listofUsers is updated.
  useEffect(() => {
    if (isStateUpdated) {
      setListofUsers(listofUsers);
      setIsStateUpdated(false);
    }
  }, [isStateUpdated]);

  // This function is to create a new user and add it to the list of users.
  // It also perform action immidately after the user is created or is from the importing.
  function createNewUser(
    newname,
    surveyResult,
    taxpayerAnswer,
    numOfDaysFromArrival,
    income,
    part1total,
    part2total,
    taxPaid
  ) {
    const newUser = new Taxpayer({
      name: newname,
      surveyResult: surveyResult,
      taxpayerAnswer: taxpayerAnswer,
      numOfDaysFromArrival,
      income: income,
      part1total: part1total,
      part2total: part2total,
      taxPaid: taxPaid,
    });
    setListofUsers((prevList) => [...prevList, newUser]);

    // If create new user is not from import
    // ask first question when the user is created
    if (!isImport) {
      // Note: The listofUsers is not updated immediately after the setListofUsers() call.
      // However, the index is listofUsers.length, i.e. first user is index 0.
      setUserIndex(listofUsers.length);
      // Set stage and count to be 1 and 0 respectively
      // so that the answer from user can be recorded
      setStage(1);
      setCount(0);
      // Ask the first question
      addChatBotQuestion("Hello " + newname + "!");
      addChatBotQuestion(botQuestion[1][0].question);
    } else {
      // If create new user is from import,
      // tell the user that the data is imported
      addChatBotQuestion("User data imported.");
    }
  }

  function addChatBotQuestion(question) {
    const mainDiv = document.getElementById("dialogue-section");
    let chatbotDiv = document.createElement("div");
    chatbotDiv.id = "chatbot";
    chatbotDiv.classList.add("message");
    chatbotDiv.innerHTML = `<span id="chatbot-reply">${question}</span>`;
    mainDiv.appendChild(chatbotDiv);
    var scroll = document.getElementById("dialogue-section");
    scroll.scrollTop = scroll.scrollHeight;
  }
  // This function find the start date on or after the arrival date.
  // If the start date is sooner than the start of the tax year,
  // It will return the start date of the tax year instead.
  function findStartDateOfTaxYear(input) {
    var arrivalDate = new Date(input);
    var startDateOfTaxYear = new Date("04/06/2022");
    // var DateAfter183Days = new Date(
    //   arrivalDate.getTime() + 183 * (1000 * 3600 * 24)
    // );
    var timeDiff = arrivalDate.getTime() - startDateOfTaxYear.getTime();
    // This function add '0' in front of the month or date if it is a single digit
    function formatMonthOrDate(input) {
      if (input.toString().length === 1) {
        return "0" + input;
      } else {
        return input;
      }
    }
    var month = formatMonthOrDate(arrivalDate.getMonth() + 1);
    var date = formatMonthOrDate(arrivalDate.getDate());
    var year = arrivalDate.getFullYear();
    if (timeDiff < 0) {
      return "04/06/2022";
    } else {
      return month + "/" + date + "/" + year;
    }
  }

  // According to the script, the input would only be
  // on or after the start date 04/06/2022
  // Hence the function below can skip checking whether
  // the input is before the start date or not
  function isStartDateWithinTaxYear2022To2023(input) {
    // var startDateOfTaxYear = new Date("04/06/2022");
    var EndDateOfTaxYear = new Date("04/05/2023");
    var inputDate = new Date(input);
    // var timeDiffWithStartDate = inputDate.getTime() - startDateOfTaxYear.getTime();
    var timeDiffWithEndDate = inputDate.getTime() - EndDateOfTaxYear.getTime();

    if (timeDiffWithEndDate > 0) {
      return false;
    } else {
      return true;
    }
  }

  // This subroutine is a procedure used by the Rightsidepanel and the UserCard in Header
  function findNextQuestionAndAsk(index) {
    // ****** Function that reuses the code ****** //
    function classifiedAsUKResidentAndCheckStartDate() {
      var startDateOfTaxYear = findStartDateOfTaxYear(
        listofUsers[index].surveyResult[0].answer
      );
      var endDateOfTaxYear = "04/05/2023";
      if (isStartDateWithinTaxYear2022To2023(startDateOfTaxYear)) {
        addChatBotQuestion(
          "You are a UK resident, and you need to pay UK tax on all your income, whether it’s from the UK or abroad."
        );
        // If findStartDateOfTaxYear() return the date of the start of tax year, which is 04/06/2022
        if (startDateOfTaxYear === "04/06/2022") {
          addChatBotQuestion(
            "I have created a file for the tax year 2022/2023 for you. Now please enter your income starting on " +
              startDateOfTaxYear +
              " and ending on " +
              endDateOfTaxYear +
              ". " +
              startDateOfTaxYear +
              " is the start date of the tax year 2022/2023."
          );
        } else {
          addChatBotQuestion(
            "I have created a file for the tax year 2022/2023 for you. Now please enter your income starting on " +
              startDateOfTaxYear +
              " and ending on " +
              endDateOfTaxYear +
              ". " +
              startDateOfTaxYear +
              " is your arrival date and it becomes your start date of the tax calculation."
          );
        }
        addChatBotQuestion(
          "We will start with calculating your non-saving income..."
        );

        // Set all status in surveyResult to answered
        listofUsers[index].setSurveyResultStatusToAllAnswered();
        // Set the stage and count to 2 and 0 respectively
        setStage(2);
        setCount(0);
        currentStage = 2;
        currentCount = 0;
      } else {
        addChatBotQuestion(
          "You are classified as a UK resident. However, you do not need to pay UK tax in the tax year 2022-2023."
        );
        addChatBotQuestion(
          "It is because your arrival date, which is on " +
            listofUsers[index].surveyResult[0].answer +
            ", is after the end of the tax year 2022-2023, which is on " +
            endDateOfTaxYear +
            "."
        );
        // Ending the conversation with the user

        // Set all status in surveyResult to answered
        listofUsers[index].setSurveyResultStatusToAllAnswered();
        // Set all status in taxpayerAnswer to skipped
        // so that all taxpayerAnswer is not marked as pending
        // hence passing the isAllTaxpayerAnswerStatusAnswered() check
        listofUsers[index].setTaxpayerAnswerStatusToAllSkipped();
      }
    }

    // ****** Function that reuses the code end ******//

    // Apply the stage and count index numbering logic
    if (
      // Check if the user is new and the surveyResult is pending
      listofUsers[index].getSurveyResultStatus() === "pending"
    ) {
      // Set the stage and count to 1 and 0 respectively
      setStage(1);
      setCount(0);
      // We use currentStage and currentCount because
      // stage & count state are not updated yet
      // inside the function.
      var currentStage = 1;
      var currentCount = 0;
    } else if (listofUsers[index].surveyResult[0].isValid === false) {
      addChatBotQuestion(
        "Please enter the date in the format MM/DD/YYYY. For example, 11/30/2022."
      );
      // Clear the invalid date input
      listofUsers[index].setSurveyResultBackToInitial(0);
      // Set the stage and count to 1 and 0 respectively
      setStage(1);
      setCount(0);
      currentStage = 1;
      currentCount = 0;
    } else if (
      // Situation for number of days from arrival is negative
      listofUsers[index].numOfDaysFromArrival < 0
    ) {
      addChatBotQuestion("Please enter a date on or before today.");
      // Set the stage and count to 1 and 0 respectively
      setStage(1);
      setCount(0);
      currentStage = 1;
      currentCount = 0;

      // Reset question 1, 2, 3 and result in the surveyResult botQuestion
      listofUsers[index].setSurveyResultBackToInitial(0);
      listofUsers[index].setSurveyResultBackToInitial(1);
      listofUsers[index].setSurveyResultBackToInitial(2);
      listofUsers[index].setSurveyResultBackToInitial(3);
    } else if (
      // Situation for the number of days is 183 days or more
      listofUsers[index].numOfDaysFromArrival >= 183 &&
      listofUsers[index].surveyResult[1].status === "pending" &&
      listofUsers[index].surveyResult[2].status === "pending"
      // Comment out checking the result's status since it is 'answered'
      // when number of days is 183 days or more
      // which means the condition is not fulfilled and the code below will not be executed
      // listofUsers[index].surveyResult[3].status === "pending"
    ) {
      addChatBotQuestion(
        "You have been in UK for 183 days or more. As a result ..."
      );
      // Go to reuseable subroutine
      classifiedAsUKResidentAndCheckStartDate();
    } else if (
      // Situation for number of days from arrival is less than 183
      // and question 1 and 2 are pending
      // where the user haven't reached 1st question yet
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "pending" &&
      listofUsers[index].surveyResult[1].answer === "" &&
      listofUsers[index].surveyResult[2].status === "pending"
    ) {
      addChatBotQuestion(
        "Your number of days from arrival is less than 183 days, please answer the following question to check whether you are a UK resident."
      );
      // Set the stage and count to 1
      setStage(1);
      setCount(1);
      currentStage = 1;
      currentCount = 1;
    } else if (
      // Situation for the user does not input yes or no in 1st question
      // given that number of days from arrival is less than 183
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "pending" &&
      listofUsers[index].surveyResult[1].answer === "undefined" &&
      listofUsers[index].surveyResult[2].status === "pending"
    ) {
      addChatBotQuestion("Please answer yes or no to the question.");
      // Set the stage and count to 1
      setStage(1);
      setCount(1);
      currentStage = 1;
      currentCount = 1;
    } else if (
      // Situation for the user answers true in 1st question
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[1].answer === true &&
      listofUsers[index].surveyResult[2].status === "pending"
    ) {
      // Go to reuseable subroutine
      classifiedAsUKResidentAndCheckStartDate();
    } else if (
      // Situation for the user answers false in 1st question
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[1].answer === false &&
      listofUsers[index].surveyResult[2].status === "pending"
    ) {
      // Set the stage and count to 1 and 2 respectively
      setStage(1);
      setCount(2);
      currentStage = 1;
      currentCount = 2;
      // addChatBotQuestion("Success");
    } else if (
      // Situation for the user does not input yes or no in 2nd question
      // given that number of days from arrival is less than 183
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[2].status === "pending" &&
      listofUsers[index].surveyResult[2].answer === "undefined"
    ) {
      addChatBotQuestion("Please answer yes or no to the question.");
      // Set the stage and count to 1 and 2 respectively
      setStage(1);
      setCount(2);
      currentStage = 1;
      currentCount = 2;
    } else if (
      // Situation for the user answers true in 2st question
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[2].status === "answered" &&
      listofUsers[index].surveyResult[2].answer === true &&
      listofUsers[index].surveyResult[3].status === "pending"
    ) {
      // Go to reuseable subroutine
      classifiedAsUKResidentAndCheckStartDate();
    } else if (
      // Situation for the user answers false in 2st question
      listofUsers[index].numOfDaysFromArrival < 183 &&
      listofUsers[index].surveyResult[1].status === "answered" &&
      listofUsers[index].surveyResult[2].status === "answered" &&
      listofUsers[index].surveyResult[2].answer === false
    ) {
      addChatBotQuestion("Survey Result: You are not a UK resident.");
      addChatBotQuestion(
        "You only have to pay tax on your UK income and do not have to pay tax on your forgein income. Income includes things like: pension, rental income, savings interest and wages"
      );
      /* Notes:
          Normally users who are not a UK resident can stop the calculation
          because they do not need to pay forgein tax,
          which is the most concerning part for new immigrant,
          and their UK income from employment in the UK have been taxed by company already,
          which means they do not need to fill in self-assessment for the 183 days after arrival.
      */

      // Set all status in surveyResult to answered
      listofUsers[index].setSurveyResultStatusToAllAnswered();
      // Set all status in taxpayerAnswer to skipped
      // so that all taxpayerAnswer is not marked as pending
      // hence passing the isAllTaxpayerAnswerStatusAnswered() check
      listofUsers[index].setTaxpayerAnswerStatusToAllSkipped();
    } else if (listofUsers[index].taxpayerAnswer[4].answer === "undefined") {
      addChatBotQuestion("Please answer yes or no to the question.");
      // Set the stage and count to 1 and 2 respectively
      setStage(2);
      setCount(4);
      currentStage = 2;
      currentCount = 4;
    } else if (!listofUsers[index].isAllTaxpayerAnswerStatusAnswered()) {
      // Show the below sentence when the user answer "Yes" to the question
      // whether he/she has foreign income
      if (
        listofUsers[index].taxpayerAnswer[4].answer === true &&
        listofUsers[index].taxpayerAnswer[5].status === "pending"
      ) {
        addChatBotQuestion(
          "Your foreign income will be counted into your self-employed income because you need to report your foreign income in a Self Assessment tax return. Special rules apply on your oversea rental income since it can apply property allowance together with your rental income in the UK. Similarly, the oversea interest and the oversea dividend can apply personal savings allowance and dividend allowance since most foreign income is taxed in the same way as UK income. Please answer the questions below: "
        );
      }
      // Check which question is still pending in stage 2
      for (var i = 0; i < botQuestion[2].length; i++) {
        if (listofUsers[index].getTaxpayerAnswerStatus(i) === "pending") {
          setStage(2);
          setCount(i);
          currentStage = 2;
          currentCount = i;
          break;
        }
      }
    }

    if (
      // End the chat when the all question answered
      listofUsers[index].getSurveyResultStatus() === "answered" &&
      listofUsers[index].isAllTaxpayerAnswerStatusAnswered()
    ) {
      // console.log("End with: " + findQuestionIndex(stage, count));
      addChatBotQuestion("End of Question");
      // Stop user changing the last item in stage 2
      // by setting the stage to 3
      // where stage 3 do not exist
      setStage(3);
    } else {
      addChatBotQuestion(botQuestion[currentStage][currentCount].question);
    }
  }

  // console.log("Specific user: " + JSON.stringify(listofUsers[userIndex]));
  console.log("list: " + JSON.stringify(listofUsers));
  // console.log("index: " + userIndex);
  // console.log("first user: " + JSON.stringify(firstUser));

  return (
    <div className="max-w-6xl mx-auto">
      <Header
        listofUsers={listofUsers}
        createNewUser={createNewUser}
        setUserIndex={setUserIndex}
        userIndex={userIndex}
        setListofUsers={setListofUsers}
        findNextQuestionAndAsk={findNextQuestionAndAsk}
        setIsImport={setIsImport}
      />
      <div className="flex flex-row justify-center h-136">
        <Leftsidepanel
          userIndex={userIndex}
          userSurveyResult={listofUsers[userIndex].surveyResult}
          userAnswer={listofUsers[userIndex].taxpayerAnswer}
          taxPaid={listofUsers[userIndex].taxPaid}
          listofUsers={listofUsers}
          setIsStateUpdated={setIsStateUpdated}
          setStage={setStage}
          setCount={setCount}
          botQuestion={botQuestion}
          addChatBotQuestion={addChatBotQuestion}
        />
        <Rightsidepanel
          userIndex={userIndex}
          listofUsers={listofUsers}
          setIsStateUpdated={setIsStateUpdated}
          stage={stage}
          count={count}
          botQuestion={botQuestion}
          addChatBotQuestion={addChatBotQuestion}
          findNextQuestionAndAsk={findNextQuestionAndAsk}
        />
      </div>
      <Reportsection />
    </div>
  );
}

export default App;

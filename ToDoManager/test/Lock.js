const { time, loadFixture,} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("TodoManager and TodoRoles", function () {
  let TodoManager, TodoRoles, todoManager, owner, admin, user1, user2;

  before (async function () {
    [owner, admin, user1, user2] = await ethers.getSigners();

    //deploy both contracts
    const TodoRoles = await hre.ethers.getContractFactory("TodoRoles");
    
    const todoRoles = await TodoRoles.deploy();

    await todoRoles.waitForDeployment();

    console.log("Todo Roles Contract Address", await todoRoles.getAddress())


    const Todo = await hre.ethers.getContractFactory("TodoManager");

    const todo = await Todo.deploy();

    await todo.waitForDeployment();

    console.log("Todo Manager Contract Address", await todo.getAddress())
  });

  describe("Roles Management", function () {
    it("should add an admin", async function () {
      await todoManager.addAdmin(admin.address)
      expect(await todoManager.addAdmin(admin.address)).to.equal(true);
    });

    it("should add a user", async function () {
      await todoManager.connect(admin).addUser(user1.address);
      expect(await todoManager.users(user1.address)).to.equal(true);
    });

    it("should fail to add user by non-admin", async function () {
      await expect(todoManager.connect(user1).addUser(user2.address)).to.be.revertedWith("Not an admin");
    });
  })

});

using AutoMapper;
using backend.Constants;
using backend.Contracts;
using backend.Data;
using backend.Exceptions;
using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace backend.Services;

public class UserService : IUserService
{
  private ApplicationDbContext _dbContext;
  private UserManager<User> _userManager;
  private IAuthenticatedUserService _authenticatedUser;
  private IMapper _mapper;

  public UserService(
    ApplicationDbContext dbContext,
    UserManager<User> userManager,
    IAuthenticatedUserService authenticatedUser,
    IMapper mapper)
  {
    _dbContext = dbContext;
    _userManager = userManager;
    _authenticatedUser = authenticatedUser;
    _mapper = mapper;
  }

  public async Task<UserResponse> AddUserAsync(UserRequest userRequest)
  {
    var user = _mapper.Map<User>(userRequest);

    if (user.Id.Equals(Guid.Empty))
    {
      var newUser = await _userManager.CreateAsync(user, userRequest.Password);

      if (!newUser.Succeeded)
      {
        throw new Exception();
      }
    }
    else
    {
      var existedUser = await _dbContext.Set<User>().FirstOrDefaultAsync(u => u.Id.Equals(userRequest.Id));

      if (existedUser is null)
      {
        throw new NotFoundException($"User {userRequest.Id.ToString()} is not found");
      }

      _dbContext.Entry<User>(existedUser).CurrentValues.SetValues(user);

      await UpsertCards(existedUser.Id, userRequest.Cards);
      await UpsertAddresses(existedUser.Id, userRequest.Addresses);
      await UpsertContacts(existedUser.Id, userRequest.Contacts);

      await _dbContext.SaveChangesAsync();
    }

    return _mapper.Map<UserResponse>(user);
  }

  public async Task<UserResponse> GetUserAsync()
  {
    var user = await _dbContext.Set<User>()
      .Include(u => u.Contacts)
      .Include(u => u.Cards)
      .Include(u => u.Addresses)
      .AsNoTracking()
      .SingleOrDefaultAsync(u => u.Id.Equals(_authenticatedUser.Id));

    return _mapper.Map<UserResponse>(user);
  }

  public async Task<IEnumerable<CustomerResponse>> GetCustomersAsync()
  {
    var users = await _dbContext.Set<User>()
      .AsNoTracking()
      .Include(u => u.Contacts)
      .Include(u => u.Cards)
      .Include(u => u.Addresses)
      .Include(u => u.Orders)
      .Where(u => u.Role.Equals(Roles.Customer))
      .ToListAsync();

    return _mapper.Map<IEnumerable<CustomerResponse>>(users);
  }

  private async Task UpsertCards(Guid userId, IEnumerable<CardResponse> newCardsRequest)
  {
    var cardIds = newCardsRequest.Select(c => c.Id).ToList();
    var cards = await _dbContext.Set<Card>().Where(c => c.UserId.Equals(userId)).ToListAsync();
    var removedCardIds = cards.Where(c => !cardIds.Contains(c.Id)).Select(c => c.Id).ToList();
    var unChangeCardIds = cards.Where(c => cardIds.Contains(c.Id)).Select(c => c.Id).ToList();
    var newCards = _mapper.Map<IEnumerable<Card>>(newCardsRequest.Where(c => !unChangeCardIds.Contains(c.Id) && !removedCardIds.Contains(c.Id)).ToList());
    if (newCards.Count() > 0)
    {
      foreach (var item in newCards)
      {
        item.UserId = userId;
      }

      await _dbContext.Set<Card>().AddRangeAsync(newCards);
    }

    foreach (var item in cards.Where(c => unChangeCardIds.Contains(c.Id)))
    {
      _dbContext.Entry<Card>(item).CurrentValues.SetValues(newCardsRequest.ToList().Find(c => c.Id.Equals(item.Id)));
    }

    _dbContext.RemoveRange(cards.Where(c => removedCardIds.Contains(c.Id)));
  }

  private async Task UpsertAddresses(Guid userId, IEnumerable<AddressResponse> newAddressesRequest)
  {
    var newAddressIds = newAddressesRequest.Select(c => c.Id).ToList();
    var addresses = await _dbContext.Set<Address>().Where(c => c.UserId.Equals(userId)).ToListAsync();
    var removedAddressIds = addresses.Where(c => !newAddressIds.Contains(c.Id)).Select(c => c.Id).ToList();
    var unChangeAddressIds = addresses.Where(c => newAddressIds.Contains(c.Id)).Select(c => c.Id).ToList();
    var newAddress = _mapper.Map<IEnumerable<Address>>(newAddressesRequest.Where(c => !unChangeAddressIds.Contains(c.Id) && !removedAddressIds.Contains(c.Id)).ToList());
    if (newAddress.Count() > 0)
    {
      foreach (var item in newAddress)
      {
        item.UserId = userId;
      }

      await _dbContext.Set<Address>().AddRangeAsync(newAddress);
    }

    foreach (var item in addresses.Where(c => unChangeAddressIds.Contains(c.Id)))
    {
      _dbContext.Entry<Address>(item).CurrentValues.SetValues(newAddressesRequest.ToList().Find(c => c.Id.Equals(item.Id)));
    }

    _dbContext.RemoveRange(addresses.Where(c => removedAddressIds.Contains(c.Id)));
  }

  private async Task UpsertContacts(Guid userId, IEnumerable<ContactResponse> newContactsRequest)
  {
    var newContactids = newContactsRequest.Select(c => c.Id).ToList();
    var contacts = await _dbContext.Set<Contact>().Where(c => c.UserId.Equals(userId)).ToListAsync();
    var removedContactIds = contacts.Where(c => !newContactids.Contains(c.Id)).Select(c => c.Id).ToList();
    var unChangeContactIds = contacts.Where(c => newContactids.Contains(c.Id)).Select(c => c.Id).ToList();
    var newContacts = _mapper.Map<IEnumerable<Contact>>(newContactsRequest.Where(c => !unChangeContactIds.Contains(c.Id) && !removedContactIds.Contains(c.Id)).ToList());
    if (newContacts.Count() > 0)
    {
      foreach (var item in newContacts)
      {
        item.UserId = userId;
      }

      await _dbContext.Set<Contact>().AddRangeAsync(newContacts);
    }

    foreach (var item in contacts.Where(c => unChangeContactIds.Contains(c.Id)))
    {
      _dbContext.Entry<Contact>(item).CurrentValues.SetValues(newContactsRequest.ToList().Find(c => c.Id.Equals(item.Id)));
    }

    _dbContext.RemoveRange(contacts.Where(c => removedContactIds.Contains(c.Id)));
  }
}